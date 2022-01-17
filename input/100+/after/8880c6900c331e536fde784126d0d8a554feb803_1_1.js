function (message, address) {
	var self = this;
	
	var jsonString = JSON.stringify(message);
	var buf = new Buffer(4 + jsonString.length, 'utf8');
	buf.writeUInt32LE(jsonString.length, 0);
	buf.write(jsonString, 4);
	
	log('INFO','[PZP -'+ self.sessionId+'] Send to '+ address + ' Message ' + jsonString);
	
	try {
		if (self.connectedWebApp[address]) { // it should be for the one of the apps connected.
			self.connectedWebApp[address].socket.pause();
			self.connectedWebApp[address].sendUTF(jsonString);
			self.connectedWebApp[address].socket.resume();
		} else if (self.connectedPzp[address]) {
			self.connectedPzp[address].socket.pause();
			self.connectedPzp[address].socket.write(buf);
			self.connectedPzp[address].socket.resume();
		} else if(self.connectedPzh[address]){
			self.connectedPzh[address].socket.pause();
			self.connectedPzh[address].socket.write(buf);
			self.connectedPzh[address].socket.resume();
		} 
	} catch (err) {
		log('ERROR', '[PZP -'+ self.sessionId+']Error in sending send message' + err);
	
	}
}