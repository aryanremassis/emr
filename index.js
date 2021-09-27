const express = require("express");
const reports = require("./reports/reports.route");

const app = express();

app.use("/reports", reports);

app.listen(5000, () => console.log("Server running"));
