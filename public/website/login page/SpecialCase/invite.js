
var clickbtn = document.querySelector('#joinbt');
clickbtn.onclick = ()=>{
    document.querySelector('.joindiv').style.top = "35vh";
    document.querySelector('.mainframe').style.opacity = "0.5"
}

function reset(){
    x.style.transform = 'scale(0)';

}

setTimeout(() => {
    // document.querySelector('.loginagain').style.top = '25%';
    // document.querySelector('.mainframe').style.opacity = '0.5'
}, 800);

function resetlogin(){
    document.querySelector('.loginagain').style.top = '-50rem';
    document.querySelector('.mainframe').style.opacity = '1'
}

