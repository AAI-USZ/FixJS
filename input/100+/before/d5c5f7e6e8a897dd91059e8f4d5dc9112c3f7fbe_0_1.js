function (req, res) {
	console.log("woo");
	var roomId = req.params.roomId;
	var name = req.params.name;
	var game = rooms[roomId]
	console.log(roomId);
	console.log(name);
	console.log(game);
	if (name === "board"){
		console.log("rendering board");
		//res.render("board", game.gameState)
		res.render("board", {gameState : game.gameState});
	}
	else{
		//res.render("private" , game.players[name])
		res.render("private");
	}
}