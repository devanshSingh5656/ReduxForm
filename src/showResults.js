import React from 'react'
import {Table} from 'react-bootstrap'

function showResults({data}) {

  return (
    <div>
    
      <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Employee Code</th>
      <th>username</th>
      <th>Phone</th>
      <th>Email</th>
      <th>Age</th>
      <th>Address</th>
      <th>Enjoyed</th>
      <th>Subjects</th>
   
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>{data?.Employee_Code}</td>
      <td>{data?.username}</td>
      <td>{data?.phone}</td>
      <td>{data?.email}</td>
      <td>{data?.age}</td>
      <td>{data?.Address}</td>
      <td>{data?.Enjoy?<p>yes</p>:<p>no</p>}</td>
      {data.Subject!==undefined? <td>
       { data.Subject.map((ele)=>(
          <p>{ele.Subject}</p>
        ))}
      </td>:<td>no data</td>}
      {console.log(data.Subject!==undefined)}

    </tr>
 
 
  </tbody>
</Table>

    </div>
  )
}

export default showResults
