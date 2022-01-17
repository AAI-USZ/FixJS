function (name, roomId, game, res){
	console.log("adding a room");
	rooms[roomId] = game;
	//res.redirect("http://localhost/room/"+name+"/"+roomId);
	//res.redirect("http://www.google.com");
	res.send({'location': "/room/"+name+"/"+roomId});

}