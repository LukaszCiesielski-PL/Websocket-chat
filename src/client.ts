import './styles/styles.scss';
let socket = new WebSocket("ws://localhost:8080");
let userName:string = '';

do{
  userName = prompt('Podaj nazwę użytkownika:');
}while(userName == '');


socket.onopen = function(e) {
    socket.send(`Użytkownik ${userName} połączony!`);
};

socket.onmessage = (e) => {
    const msg = document.querySelector('.messages');
    const item = document.createElement('div');
    item.classList.add('received');
    item.textContent = e.data;
    msg?.appendChild(item);
    console.log(e.data);
};

const sendMessage = () => {
  const inputMsg = <HTMLInputElement>document.querySelector('#msg');
  if(inputMsg.value.length != 0)
  {  
    const msg = inputMsg.value;
    socket.send(`${userName}:  ${msg}`);
    inputMsg.value = ``;
  }
}

document.getElementById('send').addEventListener('click', () => {sendMessage()});

document.addEventListener('keyup', (e) => {
  if(e.key === 'Enter')
  {
    sendMessage();
  }
});