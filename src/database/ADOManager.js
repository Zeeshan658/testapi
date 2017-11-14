'use strict';
const Joi = require('joi');
const schema = Joi.object().keys({
    cmdText: Joi.string().required().description('Command Text').error(new Error('Sql command text is missing.')),
    cmdType: Joi.string().required().description('Command Type').error(new Error('Sql command type is missing.'))
}).with('cmdText', 'cmdType');
const mysql = require('mysql');
const config = require('../config/setting').dbConfig;
const Common = require('../utilities/common');
const ADOManager = {
    datatable: function (command, callback) {
        let result = Joi.validate({
            cmdText: command.cmdText,
            cmdType: command.cmdType
        }, schema);
        if (result.error) {
            return callback(result.error, null);
        }
        let con=mysql.createConnection(config);
        con.connect(function (err) {
            con.query(command.cmdText, function (error, results, fields) {
                if (error){
                    callback(err, null);
                }else{
                    console.log(results);
                    callback(null, new Common().toCamelCase(results));
                }
            });
        });
    },
    dataset: function (command, callback) {

        let result = Joi.validate({
            cmdText: command.cmdText,
            cmdType: command.cmdType
        }, schema);

        if (result.error) {
            return callback(result.error, null);
        }

        let connection = new sql.ConnectionPool(config);
        connection.connect().then(function (response) {
            let request = new sql.Request(connection);
            if (command.parameters) {
                command.parameters.forEach(function (input) {
                    request.input(input.name, input.val);
                });
            }
            if (command.cmdType && command.cmdType.toLowerCase() == 'procedure') {
                request.execute(command.cmdText).then(function (response) {
                    connection.close();
                    callback(null, response.recordsets);
                }).catch(function (err) {
                    connection.close();
                    callback(err, null);
                });
            }
            else {
                request.query(command.cmdText).then(function (response) {
                    connection.close();
                    callback(null, response.recordsets);
                }).catch(function (err) {
                    connection.close();
                    callback(err, null);
                });
            }
        }).catch(function (err) {
            callback(err, null);
        });
    },
    executeNonQuery: function (command, callback) {
        let result = Joi.validate({
            cmdText: command.cmdText,
            cmdType: command.cmdType
        }, schema);

        if (result.error) {
            return callback(result.error, null);
        }
        let pool  = mysql.createPool(config);
        pool.getConnection(function (err, connection) {
            // Use the connection
            connection.query(command.cmdText, function (error, result, fields) {
                // And done with the connection.
                //connection.release();
                // Handle error after the release.
                if (error){
                    callback(err, null);
                }else{
                    callback(null, result.affectedRows);
                }
                // Don't use the connection here, it has been returned to the pool.
            });
        });
    },
    executeScalar: function (command, callback) {

        let result = Joi.validate({
            cmdText: command.cmdText,
            cmdType: command.cmdType
        }, schema);

        if (result.error) {
            return callback(result.error, null);
        }

        let connection = new sql.ConnectionPool(config);
        connection.connect().then(function () {
            let request = new sql.Request(connection);
            if (command.parameters) {
                command.parameters.forEach(function (input) {
                    request.input(input.name, input.val);
                });
            }
            if (command.cmdType && command.cmdType.toLowerCase() == 'procedure') {
                request.execute(command.cmdText).then(function (response) {
                    connection.close();
                    let value;
                    let result = response.recordset;
                    for (let key in result) {
                        if (result.hasOwnProperty(key)) {
                            value = result[key];
                            break;
                        }
                    }
                    callback(null, value);
                }).catch(function (err) {
                    connection.close();
                    callback(err, null);
                });
            }
            else {
                request.query(command.cmdText).then(function (response) {
                    connection.close();
                    let value;
                    let result = response.recordset;
                    for (let key in result) {
                        if (result.hasOwnProperty(key)) {
                            value = result[key];
                            break;
                        }
                    }
                    callback(null, value);
                }).catch(function (err) {
                    connection.close();
                    callback(err, null);
                });
            }
        }).catch(function (err) {
            callback(err, null);
        });
    },
};
module.exports = ADOManager;


