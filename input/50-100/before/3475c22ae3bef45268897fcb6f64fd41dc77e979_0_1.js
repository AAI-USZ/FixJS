function connectPlayer() {
        if (gameSocket === null) {
            var urlBase = window.location.href.substr("http://".length);
            urlBase = urlBase.substr(0, urlBase.indexOf('/'));
            // relativeUrl for connection for player
            var relativeUrl = jsRoutes.controllers.Gaming.connectPlayer($("#userName").text()).url; // starts with /)
            gameSocket = new WebSocket("ws://" + urlBase + relativeUrl);
            gameSocket.onmessage = receiveSummary;
        }
    }