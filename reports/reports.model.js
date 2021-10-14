const connection = require("../config/db");

function executeQuery(query, params, callback) {
  // Use the connection
  connection.query(query, params, function (error, results, fields) {
    // And done with the connection.
    // Handle error after the release.
    if (error) {
      console.log(error);
      callback(true, {});
    } else callback(false, results);
    // Don't use the connection here, it has been returned to the pool.
  });
}

let reports = {
  addReport: function (params, callback) {
    executeQuery(
      "insert into reports (user_id, appointment_id, filename, source, uploaded_by, report_type, date_created, date_modified) values (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        params.user_id,
        params.appointment_id,
        params.filename,
        params.source,
        params.uploaded_by,
        params.report_type,
        params.date,
        params.date,
      ],
      callback
    );
  },
  getReports: function (params, callback) {
    executeQuery("select * from reports", callback);
  },
  getReportById: function (params, callback) {
    executeQuery(
      "select * from reports where report_id=?",
      [params.report_id],
      callback
    );
  },
  getReportByAppointmentId: function (params, callback) {
    executeQuery(
      "select * from reports where appointment_id=?",
      [params.appointment_id],
      callback
    );
  },
};

module.exports = reports;
