var Boom = require("boom");
var Auth = require("../models/authmodel");
var auth = new Auth();
var AuthController = {}
AuthController.signIn = function (request, reply) {
    auth.signIn(request.payload.email, request.payload.password, function (error, result) {
        if (error){
            reply(Boom.unauthorized(error.message));
        }else{
        	reply(result);
        }
    });
}

AuthController.register = function (request, reply) {
    auth.register(request.payload.email,request.payload.password,request.payload.roleId,function (error, result) {
        if (error){
            reply(error);
        }else{
        	reply(result);
        }
    });
}


AuthController.isEmailExist = function (request, reply) {
    auth.isEmailExist(request.params.email,function (error, result) {
        if (error){
            reply(error);
        }else{
        	reply(result);
        }
    });
}

module.exports = AuthController;
