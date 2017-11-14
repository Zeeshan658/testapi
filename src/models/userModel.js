'use strict';
let Command = require("./commandmodel");
let db = require("../database/adomanager");
const config = require('../config/setting');
class User {
    constructor() {
    }
}

User.prototype.notaryUsers = function (callback) {
    let cmdText = "select n.user_id,n.notary_id,n.first_name,n.last_name,n.middle_name,n.company,n.commission_number,n.status_id from notary n inner join users u on u.user_id=n.user_id";
    let cmd = new Command(cmdText, "text");
    db.datatable(cmd, function (error, result) {
        if (error) {
            return callback(error, null);
        }
        return callback(null, result);
    });
}


User.prototype.notaryUserById = function (userId, callback) {
    let cmdText = "select n.* from notary n where n.user_id=" + userId;
    let cmd = new Command(cmdText, "text");
    db.datatable(cmd, function (error, result) {
        if (error) {
            return callback(error, null);
        }
        return callback(null, result);
    });
}

User.prototype.updateNotaryUserStatus = function (userId, statusId, callback) {
    let cmdText = "Update notary set status_id='" + statusId + "'  where n.user_id=" + userId;
    let cmd = new Command(cmdText, "text");
    db.executeNonQuery(cmd, function (error, result) {
        if (error) {
            return callback(error, null);
        }
        return callback(null, result);
    });
}
module.exports = User;
