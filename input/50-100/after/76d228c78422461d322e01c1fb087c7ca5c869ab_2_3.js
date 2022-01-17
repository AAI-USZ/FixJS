function makeMovesArray(id,slot){
	var moves=[];
	for(var j=0;j<4;j++){
        moves.push(sys.teamPokeMove(id,0,slot,j));
	}
	return moves;
}