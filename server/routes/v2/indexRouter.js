const express = require('express');
const router = express.Router();
const axios = require('axios');
const {log} = require('console');
require("dotenv").config();


const rootViewFolder = ''

router.get('/' , async (req,res,next) => {
    try{
        res.render(`${rootViewFolder}index` , {title:'Home Page' , data:{}, haveNavbar : true});
    }catch(error){
        res.status(500).send('Error Loading Page');
        next(error)
    }
  
});

router.get('/login' , async(req , res, next) => {
    try{
        res.render(`${rootViewFolder}login` , {title:'Libby - Login Page' , data:{}, haveNavbar : false})
    }catch(error){
        res.status(500).send('Error Loading Page');
        next(error)
    }
})

router.post('/login' , async (req,res,next) => {
    try{
        let resource = '/api/v2/auth/login';
        let endpoint = null;

        if( process.env.NODE_ENV == 'development'){
            endpoint = 'http://localhost:5500' + resource;
        }else{
            endpoint = process.env.VERCEL_URI + resource;
        }

        const response = await axios.post(endpoint, {email: req.body.email, password: req.body.password});

        res.cookie('jwt', response.data.body, {httpOnly: true , secure: true, sameSite: 'strict'} ) //Sets JWT token in httpsCookie on browser
        res.redirect('/');

    }catch(error){
        let detail = null;

        if (error.response && error.response.data) {

            if(error.response.data.status == 401 || 429){
                console.error('API Error:', error.response.data);
                res.render(`${rootViewFolder}login`, {title:'Libby - Login Page' , data:error.response.data, haveNavbar : false});
            }else{
                console.error('API Error:', error.response.data);
                res.render(`${rootViewFolder}error`, {title:'Libby - Login Page' , data:error.response.data, haveNavbar : false});
            }


        } else {
              console.error('API Error:', error);

            // detail = 'Unexpected Error: ' + error.message
            // console.error('Unexpected Error:', error.message);
            // res.render(`${rootViewFolder}error`, {title:"Error Page" , data:error , detail:detail,  haveNavbar : true});
        }
        
    }
  

});

router.get('/signup' , async(req , res, next) => {
    try{
        res.render(`${rootViewFolder}signup` , {title:'Libby - Signup Page' , data:{}, haveNavbar : false})
    }catch(error){
        res.status(500).send('Error Loading Page');
        next(error)
    }
})

router.get('/users' , async (req,res,next) => {
    try{

        const bearer = "Bearer " + req.cookies.jwt // Retrieves JWT token stored in httpsCookie

        let resource = '/api/v2/user';
        let endpoint = null;

        if( process.env.NODE_ENV == 'development'){
            endpoint = 'http://localhost:5500' + resource;
        }else{
            endpoint = process.env.VERCEL_URI + resource;
        }

        console.log(endpoint)

        var response = await axios.get( endpoint, { headers: {'Authorization' : bearer } });

        res.render(`${rootViewFolder}all_users`, {title:"All Users" , data:response.data.body , haveNavbar : true});

    }catch(error){

        res.render('error', {title:"All Users" , data:error , haveNavbar : true});
        next(error)
    }
});

module.exports = router;