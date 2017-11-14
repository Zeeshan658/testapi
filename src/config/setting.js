var Setting = {}
Setting.jwt = {
    key: "vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy",
    verifyOptions: {
        algorithms: ['HS256']
    },
    signOptions: {
        algorithm: "HS256",
        expiresIn: "4h"
    }
};
Setting.dbConfig = {
    user: 'findMn0tary', //database username
    password: '&F1ndm6_noi@45j', //database userpassword
    host: '182.50.133.82', //database server name
    database: 'mtasadduqali_findmynotary', //database name
};

module.exports = Setting;