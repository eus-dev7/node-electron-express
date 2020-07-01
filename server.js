const express=require('express');
const app=express();
const http=require('http').createServer(app);
const io=require('socket.io')(http);
const pics=require('./pics.json')

app.use(express.static('public'))

app.get('/pics',(req,res)=>res.send(pics))

io.on('connection',function(socket){

    socket.on('dragstart',(message)=>{
        const pic = pics.find(currentPic=>currentPic.name===message.name)
        pic.locked=false;
        io.emit('update',pic)
    })
    socket.on('dragend',(message)=>{
        const pic = pics.find(currentPic=>currentPic.name===message.name)
        pic.locked=true;
        pic.x=message.x;
        pic.y=message.y;

        io.emit('update',pic)
    })
})

http.listen(3000,function(){
    console.log('listening on *:3000');
});