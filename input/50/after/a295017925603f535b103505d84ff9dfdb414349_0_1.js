function (socket, Peer) {
	rtc.addPeer(Peer);

	if(rtc.getPeers()){
		socket.emit('addPeers', { peers: rtc.getPeers()});
	}
}