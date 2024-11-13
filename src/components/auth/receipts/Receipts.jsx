import axios from "axios";
import React, { useEffect, useState } from "react";

const Receipts = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/receipts`);

        // console.log(response.data);
        setData(response.data.data);
      } catch (error) {
        console.log(error.response.data);
        notifyError(
          error.response?.data?.message || "Failed to fetch receipts"
        );
      }
    };
    fetchData();
  }, []);
  console.log("data=", data);
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Receipts</h2>
      <div className="mb-3">
        <ul>
          {data.map((row) => (
            <li key={row._id}>
              {row.title} - {row.amount} - {row.location}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Receipts;
