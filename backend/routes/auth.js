const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET= 'SFSHFSHDFSFISNDFFSDFSDF';

//Create a User using : POST "/api/auth/". Doesn't require Auth


router.post('/Createuser', [
    body('name').isLength({min:1}),
    body('email').isEmail(),
    body('password').isLength({min:1})


] ,async(req, res)=>{
    //If there are errors, return bad request and the arrors
    let success = false;

    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()});
    }

    // check whether the user with this email exists already


    try{

    let user= await User.findOne({email:req.body.email});

    if(user){
        return res.status(400).json({success,error:"sorry a user with theis email already exist"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);

    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,

    })

    const data= {
        user:{
            id: user.id
        }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);

    // console.log({authtoken});
    success = true

    res.json({success,authtoken});
    }catch(error){
        console.error(error.message);
        res.state(500).send("some error occured");
    }
    
})





//Authenticate  a User using : POST "/api/auth/login". no login required


router.post('/Login', [
    body('email').isEmail(),
    body('password').isLength({min:1})


] ,async(req, res)=>{
    //If there are errors, return bad request and the arrors
    let success = false;


    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email , password} = req.body;

    try{

    let user= await User.findOne({email});

    if(!user){
        success = false;

        return res.status(400).json({error:"please try to login with correct credentials"})
    }

    const passwordCompare = await bcrypt.compare(password, user.password);


    if(!passwordCompare){
        success = false;
        return res.status(400).json({success, error:"please try to login with correct credentials"});


    }


    const data= {
        user:{
            id: user.id
        }
    }

    const authtoken = jwt.sign(data, JWT_SECRET);

    // console.log({authtoken});
    success = true;


    res.json({success, authtoken});
    }catch(error){
        console.error(error.message);
        res.state(500).send("some error occured");
    }
    
})





//get loggedin  a User details using : POST "/api/auth/getuser". login required


router.post('/getuser',fetchuser ,async(req, res)=>{
    //If there are errors, return bad request and the arrors



    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }catch(error){
        console.error(error.message);
        res.state(500).send("some error occured");
    }
    
})

module.exports = router