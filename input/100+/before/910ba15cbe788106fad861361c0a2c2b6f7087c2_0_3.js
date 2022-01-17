function() {
	var self = this;
	var socket = new (window.WebSocket || window.MozWebSocket)(this.config.get("url"));
	socket.onmessage = function(event) {
		self.config.get("onData")(utils.parseJSON(event.data));
	};
	socket.onopen = this.config.get("onOpen");
	socket.onclose = this.config.get("onClose");
	socket.onerror = function(errorResponse) {
		errorResponse = self._wrapErrorResponse(errorResponse);
		self.onError(errorResponse);
		self.config.get("onError")(errorResponse);
	};
	return socket;
}