// PARTE LÓGICA









// PARTE VISUAL

var liListItem = null;

//para inicializar cosas en la app
//cuando carge la pagina se ASIGNA LOS EVENTOS ONCLICK
function init() {
    
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

function onChatItemClick(evt) {
    //console.log(evt.currentTarget);
    var li = evt.currentTarget;
    var contactName = evt.currentTarget.getElementsByClassName("w-contact-name")[0].textContent;
    var imgURL = evt.currentTarget.getElementsByClassName("wh-44")[0].src;
    
    actualizarHeaderChat(contactName, imgURL);
}

function onSendMessage(evt) {
    
    if(evt.keyCode==13){
        // no se pone en la variable el .value
        var outMessage = document.getElementById("mensajes");
        var d = new Date();
        var time = d.getHours() +':'+ d.getMinutes();
        if(d.getMinutes<10){
            time = d.getHours() +':'+ "0" + d.getMinutes();
        }else{
            time = d.getHours() +':'+ d.getMinutes();
        }
        
        crearChat(outMessage.value, time);
        crearMensaje(outMessage.value, time);
        
        outMessage.value = "";
    }
}

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
function actualizarHeaderChat(_contactName, _imageURL, _estado) {
    var chatHeader = document.getElementById("chat-header");
    chatHeader.getElementsByClassName('w-contact-name')[0].innerHTML = _contactName;
    chatHeader.getElementsByClassName('w-users-messages')[0].innerHTML = _estado;
    chatHeader.getElementsByTagName('img')[0].src = _imageURL;
    
}

//this.onkeyup(event){ mostrarMensaje(this) }
















