const express = require('express');
const router = express.Router();
const axios = require('axios');
const {log} = require('console');
require("dotenv").config();


router.get('/' , async (req,res,next) => {
    try{
        res.render('index' , {title:'Home Page' , data: {} });
    }catch(error){
        res.status(500).send('Error fetching data from API');
    }
  
});

router.post('/login' , async (req,res,next) => {
    try{
        const response = await axios.post(`${process.env.VERCEL_URI}/api/v2/auth/login`, {email: req.body.email, password: req.body.password});
        res.cookie('jwt', response.data.body, {httpOnly: true , secure: true, sameSite: 'strict'} ) //Sets JWT token in httpsCookie on browser
        res.redirect('/');

    }catch(error){
        res.status(500).json({
           error_name: error.name,
           message: 'Error fetching data from API',
           error_message: error.message,
           error: error.stack
        }); 
    }
  
});

router.get('/users' , async (req,res,next) => {
    try{

        const bearer = "Bearer " + req.cookies.jwt // Retrieves JWT token stored in httpsCookie

        var response = await axios.get(`${process.env.VERCEL_URI}/api/v2/user`, { headers: {'Authorization' : bearer } });

        res.render('all_users', {title:"All Users" , data:response.data.body});

    }catch(error){

        res.status(500).json({
            error_name: error.name,
            message: 'Error fetching data from API',
            error_message: error.message,
            error: error.stack
         }); 

    }
});



module.exports = router;