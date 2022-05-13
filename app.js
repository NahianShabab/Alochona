const dotenv=require('dotenv');
const database=require('./services/database/databaseAPI');
const baseRoute=require('./baseRoute');
const express=require("express");
const app=express();
const cors=require('cors');
const rateLimit=require('express-rate-limit');


// initialize necessary things here before starting the server 
async function initialize(){
    dotenv.config();
    
    //init database
    await database.createPool();
    
    app.use(cors());
    
    //use rate limiter 
    const limiter=rateLimit({
    windowMs:process.env.REQUEST_WINDOW_MINUTE*60*1000,
    max:process.env.MAX_REQUEST_PER_WINDOW
    });
    app.use(limiter);

}


//start the server

initialize().
then(
    ()=>{

        app.use('/api',baseRoute);

        app.listen(process.env.PORT,()=>{
            console.log('listening at port : '+process.env.PORT);
        })
    },
    (reason)=>{
        console.log('error while initialize: reason: '+reason);
    }
);

