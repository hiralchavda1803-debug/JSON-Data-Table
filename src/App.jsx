import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const AIP = "http://localhost:3000/employees"

  const [AllData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const totalPages = Math.ceil(AllData.length / perPage);

  let lastIndex = (currentPage - 1) * perPage;
  let firstIndex = lastIndex + perPage;
  let currentData = AllData.slice(lastIndex, firstIndex);

  useEffect(() => {

    fetch(AIP, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllData(data)
      })

  }, [])


  return (
    <>
    <h1 className="text-center my-4">Employee List</h1>
      <table className="table table-bordered table-striped table-hover text-center">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Salary</th>
            <th>Department</th>
          </tr>
        </thead>

        <tbody>
          {currentData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.salary}</td>
              <td>{employee.department}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6">
              <div className="d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center gap-2">
                  <span>Pages per data</span>

                  <select className="form-select form-select-sm w-auto" value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                  </select>
                </div>

                <div>
                  <span className="fw-bold">Page {currentPage} of {totalPages}</span>
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-primary btn-sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage == 1}>
                    Previous
                  </button>

                  <button className="btn btn-primary btn-sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage == totalPages}>
                    Next
                  </button>
                </div>

              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}

export default App