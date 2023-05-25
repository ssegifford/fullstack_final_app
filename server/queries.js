const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'reviews',
  password: 'postgres',
  port: 5432,
})

//Create, Read, Update, Delete

//Get all data from database
const getReviews = (req, res)=>{
    pool.query('SELECT * FROM restaurantReviews ORDER BY id', (error, result) =>{
        if(error){
            console.log(error);
        }
        res.status(200).json(result)
    })
}

// Here we’ll get the custom id parameter by the review and use a WHERE clause to display the result.
const getReviewById = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM restaurantReviews WHERE id = $1', [id], (error, results) => {
      if (error) {
        console.log(error)
      }
      res.status(200).json(results)
    })
  }

const createReview = (request, response) => {
  const { name, review } = request.body

  pool.query('INSERT INTO restaurantReviews (name, review) VALUES ($1, $2) RETURNING *', [name, review], (error, results) => {
    if (error) {
      console.log(error)
    }
    response.status(201).send(`Review added with ID: ${results.rows[0].id}`)
  })
}

const updateReview = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, review } = request.body

  pool.query(
    'UPDATE restaurantReviews SET name = $1, review = $2 WHERE id = $3',
    [name, review, id],
    (error, results) => {
      if (error) {
        console.log(error)
      }
      response.status(200).send(`Review modified with ID: ${id}`)
    }
  )
}

const deleteReview = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM restaurantReviews WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error)
    }
    response.status(200).send(`Review deleted with ID: ${id}`)
  })
}

module.exports = {
    getReviews, getReviewById, createReview, updateReview, deleteReview
}