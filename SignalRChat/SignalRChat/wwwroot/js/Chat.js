"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var username = "";

document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " falou: " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var message = document.getElementById("message").value;
    connection.invoke("SendMessage", username, message).then(function () {
        document.getElementById("message").value = "";
    }).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

function SetUsername() {
    //Check usuario.
    var usernameinput = document.getElementById("username").value;
    if (usernameinput === "") {
        alert("Por favor, entre com um nome de usuario");
        return;
    }
    username = usernameinput;

    //Esconder div do usuario e mostrar messagens no painel.
    document.getElementById("userinfo").style.display = 'none';
    document.getElementById("messagearea").style.display = 'block';
    document.getElementById("username1").innerText = usernameinput;
}