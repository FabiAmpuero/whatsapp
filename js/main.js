// PARTE LÓGICA

// funcion clase protootipo molde
function Chat(_name, _imageURL, _lastMessage, _timeLast) {
    this.name = _name;
    this.imageURL = _imageURL;
    this.lastMessage = _lastMessage;
    this.timeLastMessage = _timeLast;
}

var listChats = [
    //creacion de instancias de la clase Chat
    new Chat("Laboratoria Perú","image/logocodeacademy.png","Hola Fabi!!"),
    new Chat("Raymi Saldomando","image/raymi.jpg","Hola Fabi!!"),
    new Chat("Mariana Costa","image/mariana.jpg", "Hola Fabi!!"),
    new Chat("Ana María Martinez Franklin","image/anamaria.jpg", "Hola Fabi!!"),
    new Chat("Rodulfo Prieto","image/rodulfo.jpg", "Hola Fabi!!"),
    new Chat("Andrea Lamas","image/andrea.jpg", "Hola Fabi!!"),
    new Chat("Maria Paula Rivarola","image/mariapaula.jpg", "Hola Fabi!!"),
    new Chat("Katy Sanchez","image/katy.jpg", "Hola Fabi!!"),
    new Chat("Aldo Alfaro","image/aldo.jpg", "Hola Fabi!!"),
    new Chat("Laboratoria Curricula","image/curricula.jpg", "Hola Fabi!!"),
    new Chat("Jose L. Lee Rázuri","image/jose.jpg", "Hola Fabi!!")
    /*{name:"Chat 1", 
     imageURL:"image/logocodeacademy.png", 
     lastMessage:"", 
     timeLastMessage:"" }*/
];

function Message (_nombre, _color, _hora, _mensaje) {
    this.nombre = _nombre;
    this.color = _color;
    this.hora = _hora;
    this.mensaje = _mensaje;
}

var messageChat = [
    new Message("Raymi", "red", "", "oli")
];



// PARTE VISUAL

var liListItem = null;

//cuando carge la pagina se ASIGNA LOS EVENTOS ONCLICK
function init() {
    
    initChatList();
}

//inicializar la lista de chats
function initChatList() {
    var d = new Date();
    // elemento ul
    var elListaChats = document.getElementById("lista-chats");
    
    for (var i in listChats){
        var htmlChatItem = 
            '<li><div class="avatar">'+
                '<img src="'+ listChats[i].imageURL +'" alt="" class="wh-44">'+
                '<h4 class="w-contact-name">'+ listChats[i].name +'</h4>'+
                '<p class="w-last-message" id="mensaje">'+ listChats[i].lastMessage +'</p>'+
            '</div>'+
            '<div class="time" id="hora">'+ listChats[i].timeLastMessage +'</div></li>';
        
        elListaChats.innerHTML += htmlChatItem;
    }
    setEventsChatList();
}

// caracteristica o funcion de la lista de chat obtener referencia de la lista chats
function setEventsChatList() {
    // se referencia al ul de la izquierda
    var listaChats = document.getElementById("lista-chats");
    // la variable contiene un OBJETO
    var arrListItems = listaChats.getElementsByTagName("li");
    for(var i=0; i<arrListItems.length; i++){
        /*arrListItems[i].onclick = function (){
            alert("click");
        }
        arrListItems[i].addEventListener("click", function(){
            alert("click listener");
        });*/
        arrListItems[i].addEventListener("click",onChatItemClick);
        
    }
}

// ----------------------------------- EVENTO CLICK LI

function onChatItemClick(evt) {
    //console.log(evt.currentTarget);
    var li = evt.currentTarget;
    var contactName = evt.currentTarget.getElementsByClassName("w-contact-name")[0].textContent;
    var imgURL = evt.currentTarget.getElementsByClassName("wh-44")[0].src;
    
    actualizarHeaderChat(contactName, imgURL, "conectado");
    actualizarChatMensajes(contactName);
    onSendMessage(evt);
}

function actualizarHeaderChat(_contactName, _imageURL, _estado) {
    var chatHeader = document.getElementById("chat-header");
    chatHeader.getElementsByClassName('w-contact-name')[0].innerHTML = _contactName;
    chatHeader.getElementsByClassName('w-users-messages')[0].innerHTML = _estado;
    chatHeader.getElementsByTagName('img')[0].src = _imageURL;
    
}

function actualizarChatMensajes(_contactName) {
    var mensajesChat = document.getElementById("chat");
    for (var i=0; i<listChats.length; i++){
        var htmlMensajeIn = 
            '<div class="w-message w-message-in">'+
                '<div class="w-message-text">'+
                    '<h5 class="green-1">'+ _contactName +'</h5>'+
                    '<p>'+ listChats[i].lastMessage +'</p>'+
                    '<div class="time">11:31</div>'+
                '</div>'+
            '</div>';
        var elChat = document.getElementById("chat");
        elChat.innerHTML = htmlMensajeIn;
    }
}

function onSendMessage(evt) {
    
    if(evt.keyCode==13){
        // no se pone en la variable el .value
        var outMessage = document.getElementById("mensajes");
        var d = new Date();
        var hora=d.getHours();
        var minuto=d.getMinutes();
        if(minuto<10){minuto='0'+minuto}
        var time = hora+":"+minuto;
        
        crearChat(outMessage.value, time);
        crearMensaje(outMessage.value, time);
        
        outMessage.value = "";
    }
}

// BUSCAR CONTACTOS

var search = document.getElementById("search");
var ulListaChats = document.getElementById("lista-chats");

var contacto = ulListaChats.getElementsByClassName("w-contact-name");
var forEach = Array.prototype.forEach;

search.addEventListener("keyup", function(e){
   var choice = this.value;
 
   forEach.call(contacto, function(f){
       if (f.innerHTML.toLowerCase().search(choice.toLowerCase()) == -1)
           f.parentNode.parentNode.style.display = "none";   
       else
          f.parentNode.parentNode.style.display = "block";        
   });
}, 
false);

// CREAR BURBUJA DE MENSAJE

function crearMensaje(_message, _time) {
    
    var htmlMensajeIn = 
        '<div class="w-message w-message-in">'+
            '<div class="w-message-text">'+
                '<h5 class="green-1">Maria Paula Rivarola</h5>'+
                '<p>Nunca!!! Juan Diego es único</p>'+
                '<div class="time">11:31</div>'+
            '</div>'+
        '</div>';
    
    // mensaje que yo envio
    var htmlMensajeOut = 
        '<div class="w-message w-message-out">'+
            '<div class="w-message-text">'+
            '<p>'+_message+'</p>'+
            '<div class="time">'+ _time +'</div>'+
            '</div>'+
        '</div>';
    
    // elemento p del ul lista-chats de la izquierda
    var mensaje = liListItem.getElementsByClassName("w-last-message")[0];
    mensaje.innerHTML = _message;
    
    // almacenando un elemento
    var elChat = document.getElementById("chat");
    elChat.innerHTML += htmlMensajeOut;
    
    // esta sentencia va luego del innerHTML
    elChat.scrollTop = elChat.scrollHeight;  
}

var almacenMensajes = [];

function crearListaChats() {
    
}


function crearChat(_message, _time) {
    var d = new Date();
    // elemento ul
    var elListaChats = document.getElementById("lista-chats");
    
    if(liListItem == null){
        liListItem = document.createElement("li");
        var htmlChatItem = 
                '<div class="avatar">'+
                    '<img src="image/logocodeacademy.png" alt="" class="wh-44">'+
                    '<h4 class="w-contact-name">Laboratoria Perú</h4>'+
                    '<p class="w-last-message" id="mensaje">'+ _message +'</p>'+
                '</div>'+
                '<div class="time" id="hora">'+ _time +'</div>';
        
        liListItem.innerHTML =htmlChatItem;
        // si no se especifica el nodo inicial se manda al final
        elListaChats.insertBefore(liListItem, elListaChats.childNodes[0]);
    }
    
    //creo un chat nuevo y actualizo la lista de chats
    setEventsChatList();
    
    //elListaChats.innerHTML += htmlChatItem;
}


//this.onkeyup(event){ mostrarMensaje(this) }
















