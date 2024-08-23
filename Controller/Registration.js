const express = require('express');
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const {Admin} = require("../Model/Admin");

const {getAuth,setAuth} = require('../Auth/Auth')

exports.Registration = async (req, res, next) => {
    try {

        console.log("====>REGISTRATION STARTS");
        
        const { userName, password } = req.body;

        // Check if the user already exists
        let existingUser = await Admin.findOne({ userName: userName });
        if (existingUser) {
            return res.send({ status: 400, text: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user instance
        const newUser = new Admin({
            userName: userName,
            password: hashedPassword,
        });

        // Save the user to the database
        const adminInstance = await newUser.save();
        
        console.log("===>user data",adminInstance);

        // Generate a token
        let token = await setAuth({ id: newUser._id });

        return res.send({ status: 200, text: "Registration Successful", user: newUser, token });

    } catch (error) {
        return res.json({ text: `Error Found`, error, status: 400 });
        next();
    }
};
