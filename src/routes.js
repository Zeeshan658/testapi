'use strict';

let Joi = require('joi');
let authController = require('./controllers/authcontroller');
let profileController = require('./controllers/profilecontroller');
let userController = require('./controllers/usercontroller');

module.exports = [
    {
        method: "GET",
        path: "/",
        handler: {
            file: 'index.html'
        }
    },
    {
        method: "POST",
        path: "/api/auth",
        handler: authController.signIn,
        config: {
            validate: {
                payload: {
                    email: Joi.string().required(),
                    password: Joi.string().alphanum().required(),
                }
            }
        }
    },
    {
        method: "GET",
        path: "/api/validateEmail/{email}",
        handler: authController.isEmailExist,
        config: {
            validate: {
                params: {
                    email: Joi.string().required()
                }
            }
        }
    },
    {
        method: "POST",
        path: "/api/register",
        handler: authController.register,
        config: {
            validate: {
                payload: {
                    email: Joi.string().required(),
                    password: Joi.string().alphanum().required(),
                    roleId: Joi.number().required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/api/uploadProfileLogo',
        handler: profileController.uploadProfileLogo,
        config: {
            payload: {
                maxBytes: 209715200,
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            }
        }
    },
    {
        method: 'GET',
        path: '/api/PersonalInfo/{userId}',
        handler: profileController.getPersonalInfo,
        config: {
            validate: {
                params: {
                    userId: Joi.number().required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/api/PersonalInfo',
        handler: profileController.updatePersonalInfo,
        config: {
            validate: {
                payload: {
                    user_id: Joi.number().required(),
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    middle_name: Joi.string().allow(null),
                    company: Joi.string().required()                    
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/api/AddressInfo/{userId}',
        handler: profileController.getAddressInfo,
        config: {
            validate: {
                params: {
                    userId: Joi.number().required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/api/AddressInfo',
        handler: profileController.updateAddressInfo,
        config: {
            validate: {
                payload: {
                    user_id: Joi.number().required(),
                    address1: Joi.string().required(),
                    address2: Joi.string().allow(null),
                    city: Joi.string().allow(null),
                    state: Joi.string().allow(null),
                    zip: Joi.number().required()                    
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/api/ComissionInfo/{userId}',
        handler: profileController.getComissionInfo,
        config: {
            validate: {
                params: {
                    userId: Joi.number().required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/api/ContactInfo/{userId}',
        handler: profileController.getContactInfo,
        config: {
            validate: {
                params: {
                    userId: Joi.number().required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/api/Services/{notaryId}',
        handler: profileController.getServices,
        config: {
            validate: {
                params: {
                    notaryId: Joi.number().required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/api/BankInfo/{userId}',
        handler: profileController.getBankInfo,
        config: {
            validate: {
                params: {
                    userId: Joi.number().required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/api/users',
        handler: userController.notaryUsers,
        config: {
            validate: {
            }
        }
    },
    {
        method: 'GET',
        path: '/api/user/{userId}',
        handler: userController.notaryUserById,
        config: {
            validate: {
                params: {
                    userId: Joi.number().required()
                }
            }
        }
    }
];
