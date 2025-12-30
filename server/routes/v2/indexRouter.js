const express = require('express');
const router = express.Router();
const axios = require('axios');
const {log} = require('console');
require("dotenv").config();
const multerMiddleware = require('../../utils/multerConfig.js');



const rootViewFolder = '';
const app_name = 'Libby'

function formEndpoint(resource){
        let endpoint = null;

        if( process.env.NODE_ENV == 'development'){
            endpoint = 'http://localhost:5500' + resource;
        }else{
            endpoint = process.env.VERCEL_URI + resource;
        }

        return endpoint
}

router.get('/' , async (req,res,next) => {
    try{
        

        var booksResponse = await axios.get(formEndpoint('/api/v2/book/categories'));
        var categoriesResponse = await axios.get(formEndpoint('/api/v2/category'));

        const data = {
            books : booksResponse.data.body,
            categories : categoriesResponse.data.body
        }

        res.render(`${rootViewFolder}index` , {title:`${app_name} - Home Page` , data:data, haveNavbar : true});
    }catch(error){
        res.status(500).send('Error Loading Page' + JSON.stringify(error));
        // next(error)
    }
  
});

router.get('/login' , async(req , res, next) => {
    try{
        res.render(`${rootViewFolder}login` , {title:`${app_name} - Login Page`, data:{}, error:{}, haveNavbar : false})
    }catch(error){
        res.status(500).send('Error Loading Page');
        // next(error)
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
                console.error('API Error:', error.response?.data || error.message);
                res.render(`${rootViewFolder}login`, {title:`${app_name} - Login Page` , data:req.body , error:error.response.data, haveNavbar : false});
            }else{
                console.error('API Error:', error.response?.data || error.message);
                res.render(`${rootViewFolder}error`, {title:`${app_name} - Error Page` , data:error.response?.data || error.message, haveNavbar : false});
            }


        } else {
              console.error('API Error:', error.response?.data || error.message);

            // detail = 'Unexpected Error: ' + error.message
            // console.error('Unexpected Error:', error.message);
            // res.render(`${rootViewFolder}error`, {title:"Error Page" , data:error , detail:detail,  haveNavbar : true});
        }
        
    }
  

});

router.get('/signup' , async(req , res, next) => {
    try{
        res.render(`${rootViewFolder}signup` , {title:`${app_name} - Signup Page` , data:{}, error:{}, haveNavbar : false})
    }catch(error){
        res.status(500).send('Error Loading Page');
        // next(error)
    }
})

router.post('/signup' , async (req,res,next) => {
    try{
        let resource = '/api/v2/auth/signup';
        let endpoint = null;

        if( process.env.NODE_ENV == 'development'){
            endpoint = 'http://localhost:5500' + resource;
        }else{
            endpoint = process.env.VERCEL_URI + resource;
        }

        const userData = {
            f_name: req.body.fname,
            l_name: req.body.lname,
            email: req.body.email,
            password: req.body.password,
            user_type : req.body.user_type ?? 'member'
        };

        const response = await axios.post(endpoint, userData);

        res.redirect('/login');

    }catch(error){
        let detail = null;

        if (error.response && error.response.data) {

            if(error.response.data.status == 400 || error.response.data.status == 429){
                console.error('API Error:', error.response.data);
                res.render(`${rootViewFolder}signup`, {title:`${app_name} - Signup Page` , data:req.body , error:error.response.data, haveNavbar : false});
            }else{
                console.error('API Error:', error.response.data);
                res.render(`${rootViewFolder}error`, {title:`${app_name} - Error Page` , data:error.response.data, haveNavbar : false});
            }


        } else {
              console.error('API Error:', error);

            // detail = 'Unexpected Error: ' + error.message
            // console.error('Unexpected Error:', error.message);
            // res.render(`${rootViewFolder}error`, {title:"Error Page" , data:error , detail:detail,  haveNavbar : true});
        }
        
    }
  

});

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
        // next(error)
    }
});

router.get('/add_book', async (req,res,next) => {
    try{
    
        let resource = '/api/v2/category';
        let endpoint = null;

        if( process.env.NODE_ENV == 'development'){
            endpoint = 'http://localhost:5500' + resource;
        }else{
            endpoint =  resource;
        }

        var response = await axios.get(endpoint);

        res.render(`${rootViewFolder}add_book`, {title:"Add Book" , data:response.data.body , haveNavbar : true , imageUrl:{}});


    }catch(error){
        let detail = null;

        if (error.response && error.response.data) {

            if(error.response.data.status == 401 || 429){
                console.error('API Error:', error.response.data);
                res.status(500).send('Error Loading Page: ' + 'API Error: ' + JSON.stringify( error.response.data ));
                
            }else{
                console.error('API Error:', error.response.data);
                res.render(`${rootViewFolder}error`, {title:'Libby - Error Page' , data:error.response.data, haveNavbar : false});
            }

        } else {
              console.error('API Error:', error);

            // detail = 'Unexpected Error: ' + error.message
            // console.error('Unexpected Error:', error.message);
            // res.render(`${rootViewFolder}error`, {title:"Error Page" , data:error , detail:detail,  haveNavbar : true});
        }
    }
});

router.post('/add_book', multerMiddleware.single('book_img'), async (req,res,next) => {
    try {

        let bookResource = '/api/v2/book';
        let bookEndpoint = null;


        if( process.env.NODE_ENV == 'development'){
            bookEndpoint = 'http://localhost:5500' + bookResource;
        }else{
            bookEndpoint = process.env.VERCEL_URI + bookResource;
        }

        let bookData = {
            book_id: req.body.book_id,
            book_nm: req.body.book_nm,
            publisher: req.body.publisher,
            author: req.body.author,
            img_url: process.env.NODE_ENV == 'development' ? (process.env.R2_PUBLIC_URI + "/" + req.file.key) : (process.env.R2_PUBLIC_URI + "/" + req.file.key),
            categories: req.body.categories,
            tot_copies: req.body.tot_copies,
            trending:   false
        }

        // res.json(bookData);

        const response = await axios.post(bookEndpoint, bookData);

        res.redirect('/');


    }catch(error){
        let detail = null;

        if (error.response && error.response.data) {

            if(error.response.data.status == 400 || error.response.data.status == 429){
                console.error('API Error:', error.response.data);
                res.render(`${rootViewFolder}error`, {title:`${app_name} - Error Page` , data:req.body , error:error.response.data, haveNavbar : false});
            }else{
                console.error('API Error:', error.response.data);
                res.render(`${rootViewFolder}error`, {title:`${app_name} - Error Page` , data:error.response.data, haveNavbar : false});
            }
        }else{
            console.error('API Error:', error.response.data);
            res.render(`${rootViewFolder}error`, {title:`${app_name} - Error Page` , data:error.response.data, haveNavbar : false});
        }
    }
})

router.get('/bookshop' , async (req,res,next) => {
    try{
        

        var booksResponse = await axios.get(formEndpoint('/api/v2/book/categories'));
        var categoriesResponse = await axios.get(formEndpoint('/api/v2/category'));

        const data = {
            books : booksResponse.data.body,
            categories : categoriesResponse.data.body
        }

        console.log(data);

        res.render(`${rootViewFolder}bookshop` , {title:`${app_name} - Book Shop Page` , data:data, haveNavbar : true});
    }catch(error){
        res.status(500).send('Error Loading Page');
        // next(error)
    }
  
});


module.exports = router;