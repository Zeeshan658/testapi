var fs = require('fs');
const uuidv1 = require('uuid/v1');
var Users = require("../models/userModel");

var users = new Users();
var UsersController = {};


UsersController.notaryUsers = function (request, reply) {
    users.notaryUsers(function (error, result) {
        if (error) {
            reply(error);
        } else {
            reply(result);
        }
    });
}

UsersController.notaryUserById = function (request, reply) {
    users.notaryUserById(request.params.userId,function (error, result) {
        if (error) {
            reply(error);
        } else {
            reply(result);
        }
    });
}

module.exports = UsersController;
