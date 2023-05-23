import React from 'react'

const TableHeader = () => {
  // boilerplate table header functional component
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>URL</th>
        <th>Remove</th>
      </tr>
    </thead>
  )
}

const TableBody = (props) => {
  // boilerplate table body functional component
  // we use Array.map to create table rows from LinkData passed via props
  const rows = props.linkData.map((row, index) => {
    return (
      <tr  key={index}>
        <td style={{borderBottom:'1px solid #ddd', padding:'2%' }}>{row.name}</td>
        <td style={{borderBottom:'1px solid #ddd' }}>
          <a  href={row.URL}>{row.URL}</a>
        </td>
        <td style={{borderBottom:'1px solid #ddd' }}>
          <button style={{backgroundColor:'cornflowerblue', padding:'5%', borderRadius:'5px', color:'white'}} onClick={() => props.removeLink(index)}>Delete</button>
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
        <TableBody linkData={props.linkData}  removeLink={props.removeLink} />
      </table>
      )
  }
}

export default Table
