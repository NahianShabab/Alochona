const dotenv=require('dotenv');
const database=require('./services/database/databaseAPI');
const baseRoute=require('./baseRoute');
const express=require("express");
const app=express();



// initialize necessary things here before starting the server 
async function initialize(){
    dotenv.config();
    await database.createPool();
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
        console.log('error while initialize: '+reason);
    }
);

