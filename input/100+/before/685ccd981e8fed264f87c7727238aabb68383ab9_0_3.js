function() {
	var self = this;
	var Socket = window.WebSocket || window.MozWebSocket;
	var socket = new Socket(this.config.get("url"));
	socket.onmessage = function(event) {
		self.config.get("onData")(utils.parseJSON(event.data));
	};
	socket.onopen = function() {
		self.config.get("onOpen");
	};
	socket.onclose = function() {
		self.config.get("onClose");
	};
	socket.onerror = function(event) {
		self.config.get("onError")(event.data);
	};
	return socket;
}