const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const sndbtn = get('.send')
const callvoice = get('.call');
const callvideo = get('.videocall');
let users = false;
let error = false;
let info = false;
// const BOT_MSGS = [
//   "No one is online",

// ];
const Hatesppech = [
  ['hardikdp', 'Bhai maa kasam isse dekh ke ayush ki yaad aa gai 😂😂😂'],
  ['harshaldp', 'kon ayush be...?'],
  ['hardikdp', 'hain IIT B1 ka ek Banda.... Ayush thakur karke...baylya hain vo...😂'],
  ['aadeshdp', 'ha pata hain....😂. Dekha hain maine usse... Chutiya harkate krta rehete hain'],
  ['harshaldp','😂😂😂'],
  ['hardikdp', 'saala ladkiyon ke saath ghumta reheta hain'],
  ['aadeshdp', 'bhai uss din na toilet mein ayush ladkiyon ke tara behave kar raha tha, aisa chaman chutiya kidar nhi dekha maine 😂'],
  ['harshaldp', '😂😂😂😂😂😂 aisa aadmi pahile bar dekha re'],
  ['hardikdp', 'bhai ye ayush group pe to nhi hai na. Fir pata chala apne se rada karne aajayega 😂😂'],
  ['aadeshdp', 'bhai fuckkkk!! iss group mein unsend ka option hi nhi aa raha 😐'],
  ['hardikdp','are shiitttt leave kar group chutiye'],
  ['harshaldp','aychi gand leave kar bhai. Unsend ho hi nhi raha'],
  ['shrishdp','are group admin ko group delete karne bolta hu mein ruk'],
  ['hardikdp','haa aisa hi kar. ayush dekhne se pehle delete karde'],
  ['aadeshdp','karo karo......'],
  ['shrishdp','naya group banaye kya?'],
  ['hardikdp','nhi bhai!!'],
  ['aadeshdp','bhai bas kar'],
  ['harshaldp','group delete kar na madarchot'],
  ['shrishdp','thike thike karta hu']
]
const REELS = [
  ['ishmitdp', 'reel0'], ['aadeshdp', 'reel2'], ['omdp', 'reel3'], ['ketkidp', 'reel4'], ['samikshadp', 'reel5'],

  ['omdp', 'reel6'], ['pranalidp', 'reel'], ['advaitdp', 'reel8'],['harshaldp','reel12']


]

// Icons made by Freepik from www.flaticon.com
var BOT_IMG = null;
const PERSON_IMG = "../assets/users/shravandp.jpg";
const BOT_NAME = "BOT";
const PERSON_NAME = "Sajad";

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";
  document.querySelector('.send').style.display = 'none';
  //   botResponse();
});

sndbtn.addEventListener('click', event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";
  document.querySelector('.send').style.display = 'none';
  //   botResponse();
})

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg actionframe" onclick='delmsg(this)'>
      <div class="msg-img" style="background-image: url(../assets/users/shravandp.jpg)"></div>

      <div class="msg-bubble">
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse() {
  const msgText = [];
  const userid = [];
  let i = 0;
  for (const [key, value] of Object.entries(BOT_MSGS)) {

    msgText.push(value);
    userid.push(key);
    // const delay = msgText.split(" ").length * 10;

  }

  setTimeout(() => {
    setInterval(() => {
      appendMessage(BOT_NAME, userid[i += 1], "left", msgText[i += 1]);
      console.log(msgText[i]);
      console.log(userid, msgText)
    }, 500)
  }, 1000)



}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function loadusers() {
  if (!users) {
    var x = document.createElement('iframe');
    x.width = '100%';
    x.height = '75%';
    x.id = 'users';
    x.src = '../SpecialCase/users.html';
    document.body.appendChild(x);
    x.style.position = 'absolute';
    x.style.top = '65px'
    x.style.left = 0
    x.style.border = '1px solid rgb(80,80,80)';
    users = true;
    msgerChat.style.opacity = '0.5';
  }

}
msgerChat.onclick = () => {
  reset();

}

callvoice.onclick = () => {
  loaderror();
}

function loaderror() {
  var x = document.querySelector('.callerror');
  x.style.top = '25%';
  error = true;
  msgerChat.style.opacity = '0.5';
}
function reset() {
  if (error) {
    document.querySelector('.callerror').style.top = '-25rem';
    error = false;
  }
  else if (users) {
    document.querySelector('#users').remove();
    users = false;
  }
  else if (info) {
    document.querySelector('.infotab').style.top = '-25rem'
    info = false;

  }
  msgerChat.style.opacity = '1';
}
function openinfo() {
  document.querySelector('.infotab').style.top = '25%';
  info = true;
  msgerChat.style.opacity = '0.5';
}
// botResponse()
function likemsg(elem) {
  var likedom = document.createElement('div');
  likedom.innerHTML = '❤️';
  likedom.setAttribute('class', 'likedom');
  elem.appendChild(likedom);
  console.log(this);
}
async function loadreels() {
  for (let i = 0; i < REELS.length; i++) {
    let reel = REELS[i];
    const msgHTML = `
    <div class="msg left-msg reelmsg" onclick='openreel(this)'  id='${i}'>
      <div class="msg-img" style="background-image: url(../assets/users/${reel[0]}.jpg)"></div>
  
      <div class="msg-reel">
        <div class="msg-text">
        <img id="video${i}" class='reel' src="../assets/img/${reel[1]}.jpg" playsinline loop>
        </div>
      </div
    </div>
    `;
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
    // document.getElementById(`${i}`).addEventListener('touchstart',(e)=>{
    //   delmsg(`${i}`)
    // })
    // document.getElementById(`${i}`).addEventListener('onclick',(e)=>{
    //   delmsg(`${i}`)
    // })
  }

}
loadreels().then(loadhatespeech());

function loadhatespeech() {
  for (let i = 0; i <= Hatesppech.length; i++) {
    var content = Hatesppech[i];
    const msgHTML = `
    <div class="msg left-msg hatespeech id="hatespeech${i}">
      <div class="msg-img" style="background-image: url(../assets/users/${content[0]}.jpg)"></div>

      <div class="msg-bubble">
        <div class="msg-text" ondblclick="likemsg(this)">${content[1]}</div>
      </div>
    </div>
  `;
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
  }

}
function openreel(x) {
  alert('something went wrong');
}
function togglesend(x) {
  if (x.value != '') {
    document.querySelector('.send').style.display = 'block';
  }
  else {
    document.querySelector('.send').style.display = 'none';
  }
}
function opencamera(){
  let mediadevice = navigator.mediaDevices;
  mediadevice.getUserMedia({video:true,audio:true})
}
function openimage(){
  alert('error :(');
}

function delmsg(id){
  console.log(id)
  const chunk = `
    <div class='actionTab hold'>
      <button class='bt'>Copy</button>  
      <button class="bt" onclick="delit(${id})">Unsend</button>  
      <button class="report bt">Report</button>
    </div>
  `
  console.log('pppp')
  id.insertAdjacentHTML('afterbegin',chunk)
}
function delit(id){
  console.log(id)
  id.removeChild();
}