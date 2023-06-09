import { useState, useEffect } from 'react'
import Table from './Table';
import Form from './Form';

const LinkContainer = (props) => {
  
  const [newReview, setNewReview] = useState([])    /* creates an array of state */
  const[message, setMessages] = useState(null)
  
  const fetchAPI = async () => {
    // fetch data from db for table
    try{
      let response = await fetch('/reviews')
      let data = await response.json()
      setMessages(data.message)
    }
    catch(error){
      console.log(error)
    }
  }

  const postReview = async () => {
    let testLink = {
      name: "Test",
      URL: "test.com"
    }

    try {
      let response = await fetch('/newReview', {
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
    const storedLinks = localStorage.getItem('reviews');
    if (storedLinks) {
      setNewReview(JSON.parse(storedLinks));
    }
  }, []);

  // Update localStorage whenever newReview state changes
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(newReview));
  }, [newReview]);



  const handleRemove = async (index) => {   /* Create logic for setting the state to filter array and remove review at index */
    const reviewToRemove = newReview[index];  

    try {
      await fetch(`/reviews/${reviewToRemove.id}`, { method: 'DELETE' });
      const filter = newReview.filter((_, i) => i !== index);/*creates new array and filters(removes) out review at index of existing array */
      setNewReview(filter);
    } catch (error) {
      console.log(error);
    }
    
  }

  const handleSubmit = (restReview) => {       
    let restReviews = [...newReview]            
    restReviews.push(restReview)                  
    setNewReview(restReviews)                  
 
    /* shorter version below
    let restReviews = [...newReview, setNewReview]; 
    setNewReview(favLinks); */

    postReview(restReview)
    fetchAPI()
  }

  return (                                  
    <div className="container" style={{width: '80%', paddingLeft:'10%',   }}>
      <h1>My Favorite Restaurant</h1>
      <p>Add a new review with your favorite restaurant name and experience to the table.</p>
  
      <Table linkData ={newReview}                            /* linkData is created prop to send data to table component */
             removeReview = {handleRemove}  />                 {/* removeReview is created prop to send data to table component*/}      
      <br />

      <h3>Add New</h3>
      <Form onNewSubmit={handleSubmit} />     {/* onNewSubmit is a created as a prop to receive data from form component file */}    
    </div>
  )
}       

export default LinkContainer
