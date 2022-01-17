function makeIVs(id,slot){
	return newIVs(
			sys.teamPokeDV(id,0,slot,0),
			sys.teamPokeDV(id,0,slot,1),
			sys.teamPokeDV(id,0,slot,2),
			sys.teamPokeDV(id,0,slot,3),
			sys.teamPokeDV(id,0,slot,4),
			sys.teamPokeDV(id,0,slot,5)
			);
}