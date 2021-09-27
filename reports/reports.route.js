const { Router } = require("express");
const router = Router();
const Controller = require("./reports.controller");
const { query } = require("express-validator");

router.post(
  "/addReport",
  query("user_id").isNumeric(),
  query("uploaded_by").isNumeric(),
  query("filename").notEmpty().isString(),
  query("report_type").notEmpty().isString(),
  query("source").notEmpty().isString(),
  Controller.addReport
);

router.get("/getReport/:report_id", Controller.getReportById);

router.get("/getReports", Controller.getReports);

module.exports = router;
