const wsUri = "wss://echo-ws-service.herokuapp.com";

const output = document.getElementById("output");
const btnSend = document.querySelector('.j-btn');
const btnGeo = document.querySelector('.j-btn-geo');
const textInp = document.querySelector('.j-inp');

let websocket;
let webSocketGeo;

function writeToScreen(message, rightSide) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  pre.style.width = "250px";
  pre.style.border = "2px solid #31b9cd";
  pre.style.borderRadius = "10px";
  pre.style.marginBlock = "5px";
  pre.style.textAlign = "center";
  if(rightSide) pre.style.alignSelf = "flex-end";
  output.appendChild(pre);
}

btnSend.addEventListener('click', () => {
  if(websocket === undefined) {
    new Promise((resolve, reject) => {
      websocket = new WebSocket(wsUri);
      websocket.onopen = function(evt) {
        resolve('Opened');
      };
      websocket.onclose = function(evt) {
        websocket.close();
        websocket = undefined;
      };
      websocket.onmessage = function(evt) {
        writeToScreen('<span style="color: blue;">' + evt.data + '</span>', true);
      };
      websocket.onerror = function(evt) {
        writeToScreen(
          '<span style="color: red;">ERROR:</span> ' + evt.data
        );
      };  
    }).then (() => {
      writeToScreen(textInp.value);
      websocket.send(textInp.value);
    }); 
  } else {
    writeToScreen(textInp.value);
    websocket.send(textInp.value);
  }
});

btnGeo.addEventListener('click', () => {
  let geoLinkMessage;
  new Promise((resolve, reject) => {
    const error = () => {
      geoLinkMessage = 'Невозможно получить ваше местоположение';
      resolve("Done");
    }
    const success = (position) => {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      geoLinkMessage = `<a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blank" style="text-decoration: none;">Геолокация</a>`;
      resolve("Done");
    }
    if (!navigator.geolocation) {
      geoLinkMessage = 'Geolocation не поддерживается вашим браузером';
      resolve("Done");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }  
  }).then (() => {
    if(webSocketGeo === undefined) {
        new Promise((resolve, reject) => {
          webSocketGeo = new WebSocket(wsUri);
          webSocketGeo.onopen = function(evt) {
            resolve('Opened');
          };
          webSocketGeo.onclose = function(evt) {
            webSocketGeo.close();
            webSocketGeo = undefined;
          };
          webSocketGeo.onmessage = function(evt) {
          };
          webSocketGeo.onerror = function(evt) {
            writeToScreen(
              '<span style="color: red;">ERROR:</span> ' + evt.data
            );
          };  
        }).then (() => {
          writeToScreen(geoLinkMessage);
          webSocketGeo.send(geoLinkMessage);
        }); 
      } else {
        writeToScreen(geoLinkMessage);
        webSocketGeo.send(geoLinkMessage);
      }
  });
});