const oracledb=require('oracledb');
const dotenv=require('dotenv');
dotenv.config();

async function createPool(){
    var poolAttributes={
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        connectString:process.env.DB_CONNECT_STRING,
        poolMax:10
    };
    await oracledb.createPool(poolAttributes);
}

function getPool(){
    var pool= oracledb.getPool();
    return pool;
}

async function getConnection(){
    var connection=await oracledb.getConnection();
    return connection;
}

async function executeQuery(sql,binds){
    var connection=await oracledb.getConnection();
    var result= await connection.execute(sql,binds,{autoCommit:true,outFormat:oracledb.OUT_FORMAT_OBJECT});
    await connection.close();
    return result.rows;
}



module.exports={createPool,getPool,getConnection,executeQuery};