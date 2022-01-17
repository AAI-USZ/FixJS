function addSocketUser(socket,lastid){
	var zombie=dead.filter(function(x){return x.socket && x.socket.id==lastid})[0];
	var user, zombie_rom;
	user=users.filter(function(x){return x.socket && x.socket.id==lastid && x.timerid})[0];
	if(user && !user.rom){
		//音もなく復帰
		clearTimeout(user.timerid);
		user.timerid=null;
		user.socket=socket;
		var obj={"rom":user.rom, id: user.id, name: user.name};
		socket.emit("userinfo",obj);
		return user;
	}
	if(zombie){
		user=zombie;
		zombie.socket=socket;
		zombie.ip=socket.handshake.address.address;
		zombie.ua=socket.handshake.headers["user-agent"];
		zombie_rom=zombie.rom;
		zombie.rom=true;
	}else{
		//新規
		user=new SocketUser(users_next,null,
			  socket.handshake.address.address,true,
			  socket.handshake.headers["user-agent"],
			  socket
			  );
	}
	users.push(user);
	var uob=user.getUserObj();
	socket.broadcast.to("useruser").emit("newuser", uob);
	toapi(function(x){
		x.userinfos.push({"name":"newuser",user:uob});
	});
	users_next++;
	if(zombie && !zombie_rom){
		//自動入室
		zombie.inout({name:zombie.name});
	}else{
		//情報を送ってあげる
		var obj={"rom":user.rom, id: user.id, name: user.name};
		socket.emit("userinfo",obj);
	}
	return user;
}