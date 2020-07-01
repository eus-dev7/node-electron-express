const express=require('express');
const app=express();
const http=require('http').createServer(app);
const io=require('socket.io')(http);
const pics=require('./pics.json')

app.use(express.static('public'))

app.get('/pics',(req,res)=>res.send(pics))

io.on('connection',function(socket){
    console.log("a user connected");

    socket.on('dragend',(message)=>{
        console.log(message);
    })
})

http.listen(3000,function(){
    console.log('listening on *:3000');
});