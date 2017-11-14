'use strict';
let Command = require("./commandmodel");
let db = require("../database/adomanager");
const config = require('../config/setting');
class Profile {
    constructor() {
    }
}

Profile.prototype.uploadProfileLogo = function (userId,logoUrl,callback) {
    let cmdText = "Update notary set logo_url='"+logoUrl+"' where user_id="+userId;
    let cmd = new Command(cmdText, "text");
    db.executeNonQuery(cmd, function (error, result) {
        if (error) {
             return callback(null, null);
        }
        return callback(null,result);
    });
}


Profile.prototype.updateProfieDesc= function (userId,description,callback) {
    let cmdText ="update TableName set description="+description+"where userId="+userId;
    let cmd = new Command(cmdText, "text");
    db.executeNonQuery(cmd, function (error, result) {
        if (error) {
            return callback(error, null);
        }
        return callback(null,result);
    });
}

Profile.prototype.getPersonalInfo = function (userId,callback) {
    console.log(userId);
    let cmdText = "SELECT u.user_id,n.first_name,n.last_name,n.middle_name,n.company FROM users u inner join notary n on n.user_id=u.user_id where u.user_id="+userId;
    let cmd = new Command(cmdText, "text");
    db.datatable(cmd, function (error, result) {
        if (error) {
            return callback(error, null);
        }
        return callback(null,result);
    });
}

Profile.prototype.updatePersonalInfo = function (user_id,first_name,last_name,middle_name,company,callback) {
    let cmdText = "UPDATE notary n INNER Join users u On u.user_id=n.user_id SET n.first_name='"+first_name+"',n.last_name='"+last_name+"',n.middle_name='"+middle_name+"',n.company='"+company+"' WHERE u.user_id="+user_id;
    let cmd = new Command(cmdText, "text");
    db.executeNonQuery(cmd, function (error, result) {
        if (error) {
            return callback(error, null);
        }
        return callback(null,result);
    });
}

Profile.prototype.getAddressInfo = function (userId,callback) {
    let cmdText = "SELECT u.user_id,n.address1,n.address2,n.city,n.state,n.zip FROM users u inner join notary n on n.user_id=u.user_id where u.user_id="+userId;
    let cmd = new Command(cmdText, "text");
    db.datatable(cmd, function (error, result) {
        if (error) {
            return callback(error, null);
        }
        return callback(null,result);
    });
}

Profile.prototype.updateAddressInfo = function (user_id,address1,address2,city,state,zip,callback) {
    let cmdText = "UPDATE notary n INNER Join users u On u.user_id=n.user_id SET address1='"+address1+"',address2='"+address2+"',city='"+city+"',state='"+state+"',zip='"+zip+"' WHERE u.user_id="+user_id;
    let cmd = new Command(cmdText, "text");
    db.executeNonQuery(cmd, function (error, result) {
        if (error) {
            return callback(error, null);
        }
        return callback(null,result);
    });
}


// Profile.prototype.updateAddressInfo = function (userId,streetAddress1,streetAddress2,city,state,zip,callback) {
//     let cmdText = "update TableName set streetAddress1="+streetAddress1+",streetAddress2="+streetAddress2+",city="+city+",state="+state+",zip="+zip+" where userId="+userId;
//     let cmd = new Command(cmdText, "text");
//     db.executeNonQuery(cmd, function (error, result) {
//         if (error) {
//             return callback(error, null);
//         }
//         return callback(null,result);
//     });
// }


Profile.prototype.getComissionInfo = function (userId,callback) {
    let cmdText = "SELECT u.user_id,n.commission_number,n.commission_expiry_date,n.img_url FROM users u inner join notary n on n.user_id=u.user_id where u.user_id="+userId;
    let cmd = new Command(cmdText, "text");
    db.datatable(cmd, function (error, result) {
        if (error) {
            return callback(error, null);
        }
        return callback(null,result);
    });
}

Profile.prototype.isCommissionExist = function (comissionNo,callback) {
    let cmdText = "select * from Table where comissionNo="+comissionNo;
    let cmd = new Command(cmdText, "text");
    db.executeNonQuery(cmd, function (error, result) {
        if (error) {
            return callback(error, null);
        }
        return callback(null,result);
    });
}
Profile.prototype.updateCommissionInfo = function (userId,comissionNo,expiryDate,logoUrl,callback) {
    let cmdText = "update TableName set comissionNo="+comissionNo+",expiryData="+expiryData+" where userId="+userId;
    let cmd = new Command(cmdText, "text");
    db.executeNonQuery(cmd, function (error, result) {
        if (error) {
            return callback(error, null);
        }
        return callback(null,result);
    });
}

Profile.prototype.getContactInfo = function (userId,callback) {
    let cmdText = "SELECT u.user_id,n.website,n.phone_number FROM users u inner join notary n on n.user_id=u.user_id where u.user_id="+userId;
    let cmd = new Command(cmdText, "text");
    db.datatable(cmd, function (error, result) {
        if (error) {
            return callback(error, null);
        }
        return callback(null,result);
    });
}

Profile.prototype.getBankInfo = function (userId,callback) {
    let cmdText = "SELECT u.user_id,n.account_number,n.ccv_code,n.card_expiry FROM users u inner join notary n on n.user_id=u.user_id where u.user_id="+userId;
    let cmd = new Command(cmdText, "text");
    db.datatable(cmd, function (error, result) {
        if (error) {
            return callback(error, null);
        }
        return callback(null,result);
    });
}

Profile.prototype.getServices = function (notaryId,callback) {
    let cmdText = "SELECT s.service_id,s.service_desc,n.status_id FROM service s Right outer JOIN notary_has_service n ON n.service_id=s.service_id WHERE n.notary_id="+notaryId;
    let cmd = new Command(cmdText, "text");
    db.datatable(cmd, function (error, result) {
        if (error) {
            return callback(error, null);
        }
        return callback(null,result);
    });
}


module.exports = Profile;
