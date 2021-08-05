const overlay = document.querySelector('.nav-overlay');
const bar = document.querySelector('h1');
const nav = document.querySelector('.navigation');
const body = document.querySelector('body')

overlay.onclick = () =>{ 
    nav.classList.add('translate');
    overlay.style.display = 'none'
    body.style.overflowY = 'scroll'
}

bar.onclick = () =>{
body.style.overflow = 'hidden'
nav.classList.remove('translate');
overlay.style.display = 'block'
}