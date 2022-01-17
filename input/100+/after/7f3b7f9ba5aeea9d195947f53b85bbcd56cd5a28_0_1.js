function () {
    socket = new window.WebSocket(socket_protocol + "://" + window.document.location.host + "/autosocket");
    socket.onmessage = onMessage; // defined in auto-irc.js or auto-rss.js
    socket.onerror = function (evt) {
        console.log("autoSocket error", evt, socket);
    }
    socket.onopen = onOpen; // defined in auto-irc.js or auto-rss.js
    socket.onclose = function (evt) {
        console.log("autoSocket closed", evt, socket);
    }

}