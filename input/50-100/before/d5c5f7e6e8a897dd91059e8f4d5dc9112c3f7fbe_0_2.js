function (req, res) {
	var roomId = req.params.roomId
	var toReturn = "";
	if (! rooms[roomId]){
		console.log("making new room");
		//rooms[roomId] = {players : {} , gameState : {} }
		addRoom( req.query.name, roomId,  new logic.Game() , res )
	}
	else{
		console.log("room: "+roomId);
		res.send({"location" : "room/"+req.query.name+"/"+roomId})
		//res.redirect("room/"+req.query.name+"/"+roomId)
	}
}