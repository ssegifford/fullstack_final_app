const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'favlinks',
  password: 'postgres',
  port: 5432,
})

//Create, Read, Update, Delete

//Get all data from database
const getLinks = (req, res)=>{
    pool.query('SELECT * FROM links ORDER BY id', (error, result) =>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    })
}

// Here we’ll get the custom id parameter by the URL and use a WHERE clause to display the result.
const getLinkById = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM links WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

const createLink = (request, response) => {
  const { name, URL } = request.body

  pool.query('INSERT INTO links (name, URL) VALUES ($1, $2) RETURNING *', [name, URL], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Link added with ID: ${results.rows[0].id}`)
  })
}

const updateLink = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, URL } = request.body

  pool.query(
    'UPDATE links SET name = $1, URL = $2 WHERE id = $3',
    [name, URL, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Link modified with ID: ${id}`)
    }
  )
}

const deleteLink = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM links WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Link deleted with ID: ${id}`)
  })
}

module.exports = {
    getLinks, getLinkById, createLink, updateLink, deleteLink
}