"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ConvertJsonToExcel = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

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
      XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets");

      XLSX.writeFile(workbook, "tickets.xlsx");
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-10">
      <Label htmlFor="bankSlip">Bank Slip</Label>
      <Input
        id=""
        name=""
        type="file"
        accept=".json"
        required
        onChange={handleFileChange}
        className="mb-3"
      />
      <Button onClick={handleExport}> Convert JSON to Excel</Button>
    </div>
  );
};

export default ConvertJsonToExcel;
