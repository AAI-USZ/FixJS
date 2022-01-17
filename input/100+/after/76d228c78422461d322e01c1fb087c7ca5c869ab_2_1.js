function makePokemon(id,slot){
	return new Pokemon(
        sys.teamPoke(id,0,slot),
		sys.teamPokeName(id,0,slot),
		sys.teamPokeGender(id,0,slot),
		sys.teamPokeAbility(id,0,slot),
		sys.teamPokeItem(id,0,slot),
		sys.teamPokeLevel(id,0,slot),
		makeIVs(id,slot),
		makeEVs(id,slot),
		makeMovesArray(id,slot),
		sys.teamPokeNature(id,0,slot),
		sys.teamPokeShine(id,0,slot),
		sys.teamPokeHappiness(id,0,slot)
		);
}