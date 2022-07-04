const SOCKET_URL = 'wss://fep-app.herokuapp.com/';
let websocket = new WebSocket(SOCKET_URL);
const sendBtn = document.getElementById ('sendBtn');
let nameEl = document.getElementById ('name');
let textEl = document.getElementById ('text');
sendBtn.addEventListener ('click',onSendBtn);

init();

function init(){
    websocket.onopen = () =>  {
        console.log ('Connection');
    };
    websocket.onclose = () =>  {
        console.log ('close');
        init();
    };
    websocket.onerror = (event) => {
        console.log ('error');
        init ();
    };
    websocket.onmessage = onMassage;
}

function onMassage ({data}) {
    const { payload : {author, massage}} = JSON.parse (data);
    document.body.insertAdjacentHTML ('afterbegin', '<div>${author}:${massage}</div>');
}

function onSendBtn () {
    const msg = {
        action: 'massage',
        payload: {
            author : nameEl.value ,
            message : textEl.value ,
        }
    }
    websocket.send(JSON.stringify(msg));
    cleanInput();
}

function cleanInput(){
    textEl.value = '';
}