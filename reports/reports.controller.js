const moment = require("moment");
const Model = require("./reports.model");
const { validationResult } = require("express-validator");

exports.addReport = (req, res) => {
  let { errors } = validationResult(req);
  if (errors.length !== 0) {
    errors = errors.map((el) => ({ [el.param]: el.msg }));
    return res.status(400).json({ errors });
  }
  const { user_id, filename, source, uploaded_by, report_type } = req.query;
  const date = moment().format("YYYY-MM-DD HH:MM:SS");
  Model.addReport(
    {
      user_id,
      filename,
      source,
      uploaded_by,
      report_type,
      date,
    },
    (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Server error" });
      } else {
        return res.json({ message: "success" });
      }
    }
  );
};

exports.getReportById = (req, res) => {
  const { report_id } = req.params;
  Model.getReportById({ report_id }, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server error" });
    } else {
      return res.json({ data: data[0] });
    }
  });
};

exports.getReports = (req, res) => {
  Model.getReports({}, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server error" });
    } else {
      return res.json({ data });
    }
  });
};
