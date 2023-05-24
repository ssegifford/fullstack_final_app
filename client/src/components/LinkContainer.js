import { useState, useEffect } from 'react'
import Table from './Table';
import Form from './Form';

const LinkContainer = (props) => {
  
  const [newLinks, setNewLinks] = useState([])    /* creates an array of state */
  const[message, setMessages] = useState(null)
  
  const fetchAPI = async () => {
    // fetch data from db for table
    try{
      let response = await fetch('/links')
      let data = await response.json()
      setMessages(data.message)
    }
    catch(error){
      console.log(error)
    }
  }

  const postLink = async () => {
    let testLink = {
      name: "Test",
      URL: "test.com"
    }

    try {
      let response = await fetch('/newLink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testLink),
      })
      console.log(response)
      let message = response.text()
      console.log(message)
    }
    catch(error) {
      console.log(error)
    }  
  }


  //use fetch to get data
  useEffect(()=>{ 
    fetchAPI()
  }, [])

  // Fetch data from localStorage on component mount
  useEffect(() => {
    const storedLinks = localStorage.getItem('links');
    if (storedLinks) {
      setNewLinks(JSON.parse(storedLinks));
    }
  }, []);

  // Update localStorage whenever newLinks state changes
  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(newLinks));
  }, [newLinks]);



  const handleRemove = async (index) => {   /* Create logic for setting the state to filter array and remove favLink at index */
    const linkToRemove = newLinks[index];  

    try {
      await fetch(`/links/${linkToRemove.id}`, { method: 'DELETE' });
      const filter = newLinks.filter((_, i) => i !== index);/*creates new array and filters(removes) out link at index of existing array */
      setNewLinks(filter);
    } catch (error) {
      console.log(error);
    }
    
  }

  const handleSubmit = (favLink) => {       /* Create logic to set state and add new favLink to favLinks array in state.
                                               Called whenever the form submits a new link. Form will pass back the message*/
    let favLinks = [...newLinks]            /* Creating a new array with old links; */
    favLinks.push(favLink)                  /* Then adding new link to the array; */
    setNewLinks(favLinks)                   /*  Then setting entire state to array with the new links*/
 
    /* shorter version below
    let favLinks = [...newLinks, favLink]; 
    setNewLinks(favLinks); */

    postLink(favLink)
    fetchAPI()
  }

  return (                                  
    <div className="container" style={{width: '80%', paddingLeft:'10%' }}>
      <h1>My Favorite Vacation</h1>
      <p>Add a new city with a name and review to the table.</p>
  
      <Table linkData ={newLinks}                            /* linkData is created prop to send data to table component */
             removeLink = {handleRemove}  />                 {/* removeLink is created prop to send data to table component*/}      
      <br />

      <h3>Add New</h3>
      <Form onNewSubmit={handleSubmit} />     {/* onNewSubmit is a created as a prop to receive data from form component file */}    
    </div>
  )
}

export default LinkContainer
