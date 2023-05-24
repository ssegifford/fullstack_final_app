import { useState } from 'react'



const Form = (props) => {
      
      const [name, setName] = useState(null)
      const [review, setReview]   = useState(null)
      
  /*  INSTEAD OF CALLING THESE METHODS FROM FORM & INPUT ATTRIBUTE, I CREATED THESE FUNCTIONS WITHIN onChange input function*/
    const handleNameChange = (event) => {
    /*   TODO - Logic for changing state based on form changes*/
    /* Event has a target with a value tied to input, to save the data in the state I need to set the value to event.target.value
       when I use state(name) it will have the value that was stored in there*/
      setName(event.target.value)
  }
  const handleReviewChange = (event) => {
      setReview(event.target.value)
  }

  const onFormSubmit = (event) => {
    // to prevent page reload on form submit
    event.preventDefault()
    /* Logic for calling props to handle submission and setting state changes.- Did this in onSubumit attribute in form instead*/
  }

  return (
    /* form has onSubmit event handler func that can be used to call another func on submission, place attribute in form*/
    <form className='form' style={{width: '80%'}} 
    onSubmit={(event)=>{
                                    event.preventDefault()
                                    props.onNewSubmit({ name: name, review: review })
                                      /* sends the name & review to the LinkContainer through props  */ } }>  

      {/* Logic for returning a form element with labels and inputs for restaurant name and review*/
         /* onChange method used in input                            */}
        <label style={{ paddingBottom:'1%'}}>Restaurant Name:  <br/>
          <input style={{width: '99%', marginBottom:'3%', padding:'1%' }} type="text" id="name" name="name" onChange={ (event)=>{setName(event.target.value)}}/><br/>
        </label> 
      
        <label style={{ paddingBottom:'1%'}}>Review:  <br/>
          <input style={{width: '99%', marginBottom:'1%', padding:'1%' }} type="text" id="review" name="review" onChange={ (event)=>{setReview(event.target.value)}} /><br/>
        </label>

        {/* use input type submit to submit form's data */}
        <input type="submit" value="Submit"/>  
        
    </form>
  )                     
}

export default Form
