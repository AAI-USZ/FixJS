function() {
	return 'WebSocket' in window || 'MozWebSocket' in window;
}