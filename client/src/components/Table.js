import React from 'react'

const TableHeader = () => {
  // boilerplate table header functional component
  return (
    <thead>
      <tr>
        <th>FAVORITE VACATION CITY</th>
        <th>REVIEW</th>
        <th>REMOVE</th>
      </tr>
    </thead>
  )
}

const TableBody = (props) => {
  // boilerplate table body functional component
  // we use Array.map to create table rows from LinkData passed via props
  const rows = props.cityData.map((row, index) => {
    return (
      <tr  key={index}>
        <td style={{borderBottom:'1px solid #ddd', padding:'2%' }}>{row.city}</td>
        <td style={{borderBottom:'1px solid #ddd' }}>
          <a  href={row.review}>{row.review}</a>
        </td>
        <td style={{borderBottom:'1px solid #ddd' }}>
          <button style={{backgroundColor:'cornflowerblue', padding:'5%', borderRadius:'5px', color:'white'}} onClick={() => props.removeReview(index)}>Delete</button>
        </td> 
      </tr>
    )
  })

  return <tbody>{rows}</tbody>
}

const Table = (props) => {
  {
    /*TODO - return <table> component, TableHeader and TableBody  and pass props!*/
    return(
      <table style={{ width: '80%', textAlign:'left'}}  >
         <TableHeader />
        <TableBody cityData={props.cityData}  removeReview={props.removeReview} />
      </table>
      )
  }
}

export default Table
