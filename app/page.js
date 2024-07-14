"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";

const ConvertJsonToExcel = () => {
  const [file, setFile] = useState(null);

  // Function to handle file upload
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Function to handle JSON to Excel conversion and download
  const handleExport = () => {
    if (!file) {
      alert("Please upload a JSON file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const jsonData = JSON.parse(e.target.result);
      const tickets = jsonData.tickets;
      const data = Object.keys(tickets).map((ticketID) => ({
        TicketID: ticketID,
        ...tickets[ticketID],
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "JsonToExcel");

      // Save the Excel file using FileSaver.js
      XLSX.writeFile(workbook, "JsonToExcel.xlsx");
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-3xl p-6 mx-auto mt-10 bg-gray-100 border rounded-lg shadow-md md:mt-20">
      <h2 className="mb-4 text-2xl font-semibold text-center">
        Convert JSON to Excel
      </h2>
      <div className="flex flex-col items-center mb-4 md:flex-row">
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="w-full px-4 py-2 mb-2 border rounded-lg md:mb-0 md:mr-2 md:w-auto"
        />
        <button
          onClick={handleExport}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none md:w-auto"
        >
          Convert JSON to Excel
        </button>
      </div>
    </div>
  );
};

export default ConvertJsonToExcel;
