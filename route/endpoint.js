const express = require('express');
const router = express.Router();
const {getUsersfromDB} = require("../db")
const {postUsersToDB} = require("../db")
router.get("/getUsers",async (req,res)=>{
    try{
        const { name, password } = req.query;
        console.log(name,password)
        const users = await getUsersfromDB(name,password);
        res.json(users);
    }
    catch(error){
        console.error("Error getting users",error);
        res.status(500).json({error:'Internal server error'});
    }
})
router.post('/postUsers',async (req,res)=>{
    try{
        const { username, email, password } = req.body;
        const users=await postUsersToDB(username,email,password);

        res.status(200).json({message:'User created succesfully',users})
    }
    catch(error){
        console.error('Error when create user:',error)
        res.status(500).json({message: 'Internal server error'});
    }
})
module.exports = router;