'use strict';

(function(){
    
    const host='http://localhost:3000';
    const socket=io(host);
    const loadPics=pics=>{
        const picsContainer=document.querySelector('.pics-container');
        pics.forEach(pic => {
            const picContainer=document.createElement('li');
            const picImage=document.createElement('img');
            const picName=document.createElement('p');

            picImage.src=pic.image;
            picName.innerText=pic.name;
            picContainer.classList.add('pic-container')

            picContainer.draggable=true;

            picContainer.addEventListener('dragstart',e=>{
                picContainer.classList.add('dragging');
            });
            picContainer.addEventListener('dragend',e=>{
                picContainer.style.left=`${e.clientX}px`
                picContainer.style.top=`${e.clientY}px`
                
                picContainer.classList.remove('dragging');
                
                socket.emit('dragend',{name:pic.name,x:e.clientX,y:e.clientY});
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