const _ = require("lodash");
const mysql = require("mysql");
const { mysql_config } = require("../config");

var crtl = {
  connection: {
    exec_sql: (req) =>
      new Promise((resolve, reject) => {
        var connection = mysql.createConnection(mysql_config.collect);
        connection.connect(function (err) {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            connection.query(req, (err_sql, result_sql) => {
              connection.end();

              if (err_sql) {
                console.error(err_sql);
              } else {
                resolve(result_sql);
              }
            });
          }
        });
      }),
  },

  getters: {
    getCrypto: () => {
      return new Promise((resolve, reject) => {
        crtl.connection
          .exec_sql("SELECT * FROM Base_test")
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            console.err(err);
          });
      });
    },
  },

  setters: {

  },
};
module.exports = crtl;
