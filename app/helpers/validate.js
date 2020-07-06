const Joi = require('@hapi/joi');
const User = require('../models/user');
const Client = require('../models/clients');

//Autorization dates when user push button
const startGameValidate = async (data) => {
    const user = await User.findOne({ _id: data.userId, name: data.userName });
    if (!user) return { error: 'User is not found!' };
    const client = await Client.findById(data.clientId);
    if (!client) return { error: 'Client is not found!' };
    return {
        user: { uuid: user._id, name: user.name },
        client: client._id
    }

};

//Autorization user 
const loginValidate = async (data) => {
    //Validate request date
    const { error } = loginSchema(data);
    if (error) return { error: error.details[0].message };
    //Check if the email is exits
    const user = await User.findOne({ email: data.email });
    if (!user) return { error: 'Email is not found!' };
    //Password is correct
    const validPass = data.password === user.password;
    if (!validPass) return { error: 'Invalid password!' };
    return { id: user._id, name: user.name };
};

//Register user
const registerValidate = async (data) => {
    //Validate request date
    const { error } = registerSchema(data);
    if (error) return { error: error.details[0].message };
    //Check if the email is already in the database
    const emailExist = await User.findOne({ email: data.email });
    if (emailExist) return { error: 'Email is exist!' };
    //Check if the name is already in database
    const nameExist = await User.findOne({ name: data.name });
    if (nameExist) return { error: 'Name is exist!' };

    return { email: data.email, name: data.name, password: data.password }
};

//Schema for validate register user
const registerSchema = (data) => {
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        name: Joi.string()
            .min(3)
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        repitpass: Joi.ref('password')
    };
    return Joi.validate(data, schema)
};

//Schema for validate autorization user
const loginSchema = (data) => {
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
    };
    return Joi.validate(data, schema);
};

module.exports = {
    registerValidate,
    loginValidate,
    startGameValidate
};