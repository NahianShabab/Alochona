const express=require('express');
const router=express.Router();
const database=require('./services/database/databaseAPI');

router.get('/',(req,res)=>{
    res.send('hello from base router!');
})

router.get('/data',async (req,res)=>{
    var result=await database.executeQuery('SELECT * FROM BOOK',{});
    res.send(result);
})



module.exports=router;