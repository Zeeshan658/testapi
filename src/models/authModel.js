'use strict';
let jwt = require("jsonwebtoken");
let Command = require("./commandmodel");
let db = require("../database/adomanager");
const config = require('../config/setting');
class Auth {
    constructor() {
    }
}
Auth.prototype.signIn = function (email, password, callback) {
    let cmdText = "select user_id,email,password from users where email='"+email+"' and password='"+password+"' and is_deleted=0";
    let cmd = new Command(cmdText, "text");
    db.datatable(cmd, function (error, result) {
        if (error) {
            return callback(error, null);
        }
        let user = result[0];
        if (user && user.password === password) {
            const token = jwt.sign({
                user,
                userId: user.user_id,
                scope: "user",
            }, config.jwt.key, config.jwt.signOptions);
            return callback(null,
                {
                    user: user,
                    token: token
                })
        }
        else {
            return callback({ "message": "Invalid user name or password" }, null);
        }
    });
}

Auth.prototype.register = function (email,password,roleId,callback) {
    let cmdText='INSERT INTO users(email, password, roles_id, is_deleted)VALUES("'+email+'","'+password+'",'+roleId+',0)'
    let cmd = new Command(cmdText, "text");
    db.executeNonQuery(cmd, function (error, result) {
        if (error) {
            return callback(error, null);
        }
        console.log(error);
        return callback(null,result);
    });
}

Auth.prototype.isEmailExist = function (email,callback) {
    let cmdText='select * from users where email="'+email+'"';
    let cmd = new Command(cmdText, "text");
    db.datatable(cmd, function (error, result) {
        if (error) {
            return callback(error, null);
        }
        if(result.length>0){
            return callback(null,true);
        }else{
            return callback(null,false);
        }
    });
}


module.exports = Auth;
