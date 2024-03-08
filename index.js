const express =require('express');
const https=require('https');
const path=require('path');
const fs=require('fs');
const cors =require('cors')
const jsforce=require('jsforce');
const bodyParser = require('body-parser'); 
const {Client}=require('pg')
require('dotenv').config();


const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
const PORT=3001

const {SF_LOGIN_URL,SF_USERNAME,SF_PASSWORD,SF_TOKEN,PG_USER,PG_PASSWORD,PG_DATABASE,PG_HOST,PG_PORT}=process.env


const conn=new jsforce.Connection();
conn.login(SF_USERNAME,SF_PASSWORD+SF_TOKEN,(err,userInfo)=>{
    if(err)
    console.log(err);
    else
    console.log("userInfo"+userInfo.id);
})

const client=new Client({
    user:PG_USER,
    host:PG_HOST,
    database:PG_DATABASE,
    password:PG_PASSWORD,
    port:PG_PORT
})

client.connect((err)=>{
    if(err)
    console.log(err)
    else
    console.log("Connected To DB");
})

// const  sslServer=https.createServer({
//     key:fs.readFileSync(path.join(__dirname,'cert','key.pem')),
//     cert:fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
// },app)

// sslServer.listen(3001,()=>console.log('Secure server on port 3001'));
app.post('/:Name/:Id',(req,resp)=>{
    const name=req.params.Name;
    const Id=req.params.Id;
    return resp.send({body:req.body,message:"Salesforce integration with nodejs"});
})
app.post('/create/Account/Record',(req,resp)=>{
 const name=req.body.name;
 const Id=req.body.Id;
});
app.listen(PORT,(err)=>{
    if(err)console.log(err);
    else
    console.log('Sever is running');
})