const dotenv=require('dotenv');
const database=require('./database/databaseAPI');
const baseRoute=require('./routes/baseRoute');
const express=require("express");
const app=express();
const cors=require('cors');
const rateLimit=require('express-rate-limit');
const bodyParser=require('body-parser');


// initialize necessary things here before starting the server 
async function initialize(){
    try{
        dotenv.config();
        
        //init database
        await database.createPool();
        await database.getConnection();
        
        app.use(cors());
        
        //use rate limiter 
        const limiter=rateLimit({
        windowMs:process.env.REQUEST_WINDOW_MINUTE*60*1000,
        max:process.env.MAX_REQUEST_PER_WINDOW
        });
        app.use(limiter);
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    }catch(err){
        throw err;
    }
}


//start the server
initialize()
.then(
    (value)=>{
        app.use('/api',baseRoute);

        app.listen(process.env.PORT,()=>{
            console.log('listening at port : '+process.env.PORT);
        })
    },
    (reason)=>{
        console.log(reason);
    }
)
