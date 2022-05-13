const express=require('express');
const router=express.Router();
const database=require('./services/database/databaseAPI');

router.get('/',(req,res)=>{
    res.status(200).send("hello from base router!");
})



module.exports=router;