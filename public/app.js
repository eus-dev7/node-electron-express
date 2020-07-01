'use strict';

(function(){
    const width=1000;
    const height=700;
    window.resizeTo(width,height);
    window.addEventListener('resize',e=>{
        window.resizeTo(width,height);
    })
    const host='http://localhost:3000';
    const socket=io(host);

    const dislikeCounter=document.querySelector('.dislike-counter');
    const likeCounter=document.querySelector('.like-counter');
    const countsPics=pics=>{
        const disliked=pic=>pic.x>=width/2;
        
        const picsCounter=pics.reduce((acc, current)=>{
            if(disliked(current)) acc+=1;
            return acc;
        },0)
        dislikeCounter.innerText=`Dislikes ${picsCounter}`
        likeCounter.innerText=`Likes ${pics.length-picsCounter}`
    }
    const loadPics=pics=>{
        countsPics(pics)
        const picsContainer=document.querySelector('.pics-container');
        
        socket.on('update', data=>{
            countsPics(pics)
            pics[pics.findIndex(currentPic=>currentPic.name===data.name)]=data;

            const picContainer=document.querySelector(`[data-id=${data.name}]`)
            picContainer.style.left=`${data.x}px`;
            picContainer.style.top=`${data.y}px`;
        })
        pics.forEach(pic => {
            const picContainer=document.createElement('li');
            const picImage=document.createElement('img');
            const picName=document.createElement('p');

            picImage.src=pic.image;
            picName.innerText=pic.name;
            picContainer.dataset.id=pic.name;
            picContainer.classList.add('pic-container')

            picContainer.style.left=`${pic.x}px`;
            picContainer.style.top=`${pic.y}px`;

            picContainer.draggable=true;

            picContainer.addEventListener('dragstart',e=>{
                if(pic.locked) {
                    e.preventDefault();
                    return
                }
                picContainer.classList.add('dragging');
            });
            picContainer.addEventListener('dragend',e=>{
                picContainer.style.left=`${e.pageX}px`
                picContainer.style.top=`${e.pageY}px`
                
                picContainer.classList.remove('dragging');
                
                socket.emit('dragend',{name:pic.name,x:e.clientX,y:e.pageY});
            });

            picContainer.appendChild(picImage);
            picContainer.appendChild(picName);
            picsContainer.appendChild(picContainer);
        });
    }
    fetch(`${host}/pics`)
        .then(res=>res.json())
        .then(pics=>loadPics(pics))
})()