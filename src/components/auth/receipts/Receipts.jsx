import axios from "axios";
// import path from "path";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import DateFormat from "../../utils/DateFormat";
import ImageDownloader from "../../utils/ImageDownloader";

const Receipts = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [data, setData] = useState([]);

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const openViewer = (imageSrc) => {
    setCurrentImage(imageSrc);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/receipts`, {
          params: {
            sort: "desc", // Sorting parameter for descending order
          },
        });

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

  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    // Slice the data for the current page
    setCurrentData(
      data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    );
  }, [data, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    let search = e.target.value;
    setSearch(search);
    if (search !== "") {
      setCurrentData(
        data.filter(
          (row) =>
            row.title.includes(search) ||
            row.amount.includes(search) ||
            row.location.includes(search) ||
            row.date.includes(search) ||
            row.description.includes(search)
        )
      );
    } else {
      setCurrentData(
        data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
      );
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Receipts ({data?.length})</h2>
      <div className="mb-3 thumbnails">
        <div className="table-responsive-sm">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => handleSearch(e)}
          />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
                <th scope="col">Location</th>
                <th scope="col">Desc</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, index) => {
                let imgPath = "";
                if (row.image !== undefined && row.image.includes("uploads")) {
                  imgPath = `${backendUrl}${row.image}`;
                } else {
                  const uploadPath = import.meta.env.VITE_UPLOAD_PATH;
                  imgPath = `${backendUrl}${uploadPath}${row.image}`;
                }

                return (
                  <tr key={index}>
                    <th scope="row">
                      {row.image !== undefined && !imgPath.includes(".pdf") && (
                        <img
                          src={`${imgPath}`}
                          alt="image"
                          className="thumbnail"
                          onClick={() => openViewer(`${imgPath}`)}
                        />
                      )}
                      {row.image !== undefined && imgPath.includes(".pdf") && (
                        <a
                          href={imgPath}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Pdf File
                        </a>
                      )}
                    </th>
                    <td>{row.title}</td>
                    <td>{row.amount}</td>
                    <td>
                      <DateFormat
                        date={row.date}
                        format="MMM D, YYYY hh:mm A"
                      />
                    </td>
                    <td>{row.location}</td>
                    <td>{row.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Pagination Controls */}

          <ReactPaginate
            pageCount={Math.ceil(data.length / itemsPerPage)} // Total pages
            onPageChange={handlePageChange} // Page change handler
            pageRangeDisplayed={5} // Number of pages to show
            marginPagesDisplayed={1} // Number of margin pages
            containerClassName={"pagination"} // Custom class for pagination container
            activeClassName={"active"} // Active class for the current page
          />
        </div>
        {isViewerOpen && (
          <div className="viewer" onClick={closeViewer}>
            <img src={currentImage} alt="Full Screen" />
            <ImageDownloader
              imageUrl={currentImage}
              fileName="downloaded-receipt.jpg"
            />
          </div>
        )}
        {/* <ul>
          {data.map((row) => {
            let imgPath = "";
            if (row.image !== undefined && row.image.includes("uploads")) {
              imgPath = `${backendUrl}${row.image}`;
            } else {
              const uploadPath = import.meta.env.VITE_UPLOAD_PATH;
              imgPath = `${backendUrl}${uploadPath}${row.image}`;
            }

            return (
              <li key={row._id}>
                {row.title} - {row.amount} - {row.location}
                {row.image !== undefined && !imgPath.includes(".pdf") && (
                  <img
                    src={`${imgPath}`}
                    alt="image"
                    className="thumbnail"
                    onClick={() => openViewer(`${imgPath}`)}
                  />
                )}
                {row.image !== undefined && imgPath.includes(".pdf") && (
                  <a href={imgPath} target="_blank" rel="noopener noreferrer">
                    View Pdf File
                  </a>
                )}
              </li>
            );
          })}
          </ul> */}
      </div>
    </div>
  );
};

export default Receipts;
