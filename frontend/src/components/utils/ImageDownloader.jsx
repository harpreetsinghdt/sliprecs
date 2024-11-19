import React from "react";

const ImageDownloader = ({ imageUrl, fileName }) => {
  const handleDownload = () => {
    // Fetch the file as a blob
    fetch(imageUrl)
      .then((response) => response.blob()) // Convert response to a Blob
      .then((blob) => {
        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a temporary <a> element
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName; // Set the download attribute with the desired filename
        document.body.appendChild(link);

        // Programmatically click the <a> to trigger the download
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading the image:", error));
  };

  return <button className="downloadReceipt" onClick={handleDownload}>Download</button>;
};

export default ImageDownloader;
