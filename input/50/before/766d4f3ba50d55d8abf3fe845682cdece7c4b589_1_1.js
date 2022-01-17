function(){
	this.socket.emit("regist",{"mode":"client","lastid":this.sessionid});
}