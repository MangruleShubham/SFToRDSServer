const express =require('express');
const https=require('https');
const path=require('path');
const fs=require('fs');
const cors =require('cors')
const jsforce=require('jsforce');
require('dotenv').config();

const app = express()
app.use(cors());
const PORT=3001

const {SF_LOGIN_URL,SF_USERNAME,SF_PASSWORD,SF_TOKEN}=process.env
const conn=new jsforce.Connection();
conn.login(SF_USERNAME,SF_PASSWORD+SF_TOKEN,(err,userInfo)=>{
    if(err)
    console.log(err);
    else
    console.log("userInfo"+userInfo.id);
})

// const  sslServer=https.createServer({
//     key:fs.readFileSync(path.join(__dirname,'cert','key.pem')),
//     cert:fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
// },app)

// sslServer.listen(3001,()=>console.log('Secure server on port 3001'));
// app.post('/',(req,resp)=>{
//     resp.send({message:"Salesforce integration with nodejs"});
// })
app.listen(PORT,(err)=>{
    if(err)console.log(err);
    else
    console.log('Sever is running');
})