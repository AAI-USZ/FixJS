function makeEVs(id,slot){
	return newEVs(
			sys.teamPokeEV(id,0,slot,0),
			sys.teamPokeEV(id,0,slot,1),
			sys.teamPokeEV(id,0,slot,2),
			sys.teamPokeEV(id,0,slot,3),
			sys.teamPokeEV(id,0,slot,4),
			sys.teamPokeEV(id,0,slot,5)
			);
}