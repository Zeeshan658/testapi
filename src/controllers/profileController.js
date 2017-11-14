var fs = require('fs');
const uuidv1 = require('uuid/v1');
var Profile = require("../models/profilemodel");
var profile = new Profile();
var ProfileController = {};
ProfileController.uploadProfileLogo = function (request, reply) {
    var data = request.payload;
    var logoUrl = '';
    if (request.payload) {
        var logoUrl = '/public/uploads/' + uuidv1() + '.png';
        var image = fs.createWriteStream(__dirname + '/../..' + logoUrl);
        image.on('error', function (err) {
            reply(err);
        });
        image.on('finish', function () {
            profile.uploadProfileLogo(request.payload.userId, logoUrl, function (error, result) {
                if (error) {
                    reply(error);
                } else {
                    reply({ userId: request.payload.userId, logoUrl: logoUrl }, result);
                }
            });
        });
        request.payload.image.pipe(image);
        //fs.unlink(__dirname + '/..'+'/public/uploads/6e9114c0-ba19-11e7-995f-cbc88d6bf4d6.png')
    }
}

ProfileController.updateProfieDesc = function (request, reply) {
    profile.updateProfieDesc(request.payload.userId, request.payload.description, function (error, result) {
        if (error) {
            reply(error);
        } else {
            reply(result);
        }
    });
}




ProfileController.getPersonalInfo = function (request, reply) {
    profile.getPersonalInfo(request.params.userId, function (error, result) {
        if (error) {
            reply(error);
        } else {
            reply(result);
        }
    });
}

ProfileController.updatePersonalInfo = function (request, reply) {
    profile.updatePersonalInfo(request.payload.user_id, request.payload.first_name, request.payload.last_name, request.payload.middle_name, request.payload.company, function (error, result) {
        if (error) {
            reply(error);
        } else {
            reply(result);
        }
    });
}

ProfileController.getAddressInfo = function (request, reply) {
    profile.getAddressInfo(request.params.userId, function (error, result) {
        if (error) {
            reply(error);
        } else {
            reply(result);
        }
    });
}

ProfileController.updateAddressInfo = function (request, reply) {
    profile.updateAddressInfo(request.payload.user_id, request.payload.address1, request.payload.address2, request.payload.city, request.payload.state, request.payload.zip, function (error, result) {
        if (error) {
            reply(error);
        } else {
            reply(result);
        }
    });
}

ProfileController.isCommissionExist = function (request, reply) {
    profile.isCommissionExist(request.params.comissionNo, function (error, result) {
        if (error) {
            reply(error);
        } else {
            reply(result);
        }
    });
}
ProfileController.getComissionInfo = function (request, reply) {
    profile.getComissionInfo(request.params.userId, function (error, result) {
        if (error) {
            reply(error);
        } else {
            reply(result);
        }
    });
}
ProfileController.updateCommissionInfo = function (request, reply) {
    profile.updateCommissionInfo(request.payload.userId, request.payload.comissionNo, request.payload.expiryDate, request.payload.logoUrl, function (error, result) {
        if (error) {
            reply(error);
        } else {
            reply(result);
        }
    });
}

ProfileController.getContactInfo = function (request, reply) {
    profile.getContactInfo(request.params.userId, function (error, result) {
        if (error) {
            reply(error);
        } else {
            reply(result);
        }
    });
}

ProfileController.getBankInfo = function (request, reply) {
    profile.getBankInfo(request.params.userId, function (error, result) {
        if (error) {
            reply(error);
        } else {
            reply(result);
        }
    });
}



ProfileController.getServices = function (request, reply) {
    profile.getServices(request.params.notaryId, function (error, result) {
        if (error) {
            reply(error);
        } else {
            reply(result);
        }
    });
}


module.exports = ProfileController;
