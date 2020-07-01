(function(){
    const startButton=document.querySelector('.start-button')
    startButton.addEventListener('click',e=>{
        e.preventDefault()
        const pop=window.open('/pics.html',"widows","menubar=1,r")
    })
})()