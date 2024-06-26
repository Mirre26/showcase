var connection = new signalR.HubConnectionBuilder().withUrl("/ChatHub").build();


connection.on("ReceiveMessage", function (message) {
    var discussion = document.getElementById("discussion");

    // Clear existing content of discussion list
    discussion.innerHTML = "";

    message.forEach(function (m, index) {
        var li = document.createElement("li");
        li.textContent = (index + 1) + ": " + m;
        discussion.appendChild(li);
    });
});

connection.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("gameContainer").addEventListener("click", function (event) {
    connection.invoke("SendMessage").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("newGameButton").addEventListener("click", function (event) {
    connection.invoke("SendMessage").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
document.getElementById("lastbutton").addEventListener("click", function (event) {

    
    connection.invoke("SendMessage").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

