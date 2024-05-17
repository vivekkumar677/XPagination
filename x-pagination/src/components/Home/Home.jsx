import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Home.module.css";

const Home = () => {
  const [count, setCount] = useState();
  const [dataTable, setDataTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const employeesPerPage = 10;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const result = response.data;
      console.log(result);
      setDataTable(result);
    } catch (error) {
      setError("Fetching error to retrieve data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNext = () => {
    if (currentPage < Math.ceil(dataTable.length / employeesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = dataTable.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  return (
    <div>
      <h1>Employee Data Table</h1>
      {error ? (
        <div className="error">{alert("failed to fetch data")}</div>
      ) : (
        <>
        <div>
          <table>
            <thead >
              <tr>
                <th>id</th>
                <th>name</th>
                <th>email</th>
                <th>role</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className={styles.pagination}>
            <button onClick={handlePrevious}>Previous</button>
            <span>{currentPage}</span>
            <button onClick={handleNext}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
