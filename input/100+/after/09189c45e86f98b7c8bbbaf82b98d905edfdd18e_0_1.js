function(atkunit, defunit)
{
	var aPos = atkunit.getPos();
	var dPos = defunit.getPos();
	
	var aData = atkunit.unitData();
	var dData = defunit.unitData();
	
	var aType = aData.target;
	var dType = dData.target;
	
	var aHex = atkunit.getHex();
	var dHex = defunit.getHex();
	
	var aExpBars = (atkunit.experience / 100) >> 0;
	var dExpBars = (defunit.experience / 100) >> 0;
	
	var aav = 0; //Attacker attack value
	var adv = 0; //Attacker defense value
	var dav = 0; //Defender attack value
	var ddv = 0; //Defender defense value
	
	var cr = new combatResults();
	var d = GameRules.distance(aPos.row, aPos.col, dPos.row, dPos.col); //distance between units

	var aTerrain = aHex.terrain;
	var dTerrain = dHex.terrain;
	
	if (isAir(atkunit))	aTerrain == terrainType.Clear;
	if (isAir(defunit))	dTerrain == terrainType.Clear;	
	
	//Attacking unit type
	switch(aType)
	{
		case unitType.air:
		{
			dav = dData.airatk;
			ddv = dData.airdef;
			break;
		}
		case unitType.soft:
		{
			dav = dData.softatk;
			ddv = dData.grounddef;
			break;
		}
		case unitType.hard:
		{
			dav = dData.hardatk;
			ddv = dData.grounddef;
			break;
		}
	}
	//Defending unit type
	switch(dType)
	{
		case unitType.air:
		{
			aav = aData.airatk;
			adv = aData.airdef;
			break;
		}
		case unitType.soft:
		{
			aav = aData.softatk;
			adv = aData.grounddef;
			break;
		}
		case unitType.hard:
		{
			aav = aData.hardatk;
			adv = aData.grounddef;
			break;
		}
	}
	
	//TODO Close Combat defender use Close Defense except when it's infantry which makes attacker use CD
	//Bigger losses when fighting in cities
	if (isCloseCombatTerrain(dTerrain))
	{
		if (dData.uclass == unitClass.infantry)
		{
			adv = aData.closedef;
		}
		else
		{
			ddv = dData.closedef;
			aav += 4;
		}
		
		if (aData.uclass == unitClass.infantry)
			ddv = dData.closedef;
		else
			dav += 4;
	}
	//TODO Unit types
	if (dData.uclass == unitClass.artillery)
		adv += 3;
		
	//TODO Weather
	
	//TODO Terrain checks
	if (dTerrain == terrainType.City)
		ddv += 4;
	if ((dTerrain == terrainType.River || dTerrain == terrainType.Stream) && dHex.road == roadType.none)
	{	
		ddv -= 4;
		aav += 4;
	}
	if ((aTerrain == terrainType.River || aTerrain == terrainType.Stream) && aHex.road == roadType.none)
	{
		adv -= 4;
		dav += 4;
	}

	//TODO Entrenchment
	adv += atkunit.entrenchment;
	ddv += defunit.entrenchment;
	//Add entrechment twice for infantry in city, forest, mountain if not attacked by infantry/arty/air/naval
	if (dData.uclass == unitClass.infantry && isCloseCombatTerrain(dTerrain))
		if (aData.uclass > unitClass.infantry && aData.uclass < unitClass.groundTransport)
			ddv += defunit.entrenchment;
	
		
	
	//TODO Experience
	aav += aExpBars;
	adv += aExpBars;
	dav += dExpBars;
	ddv += dExpBars;

	//TODO Received attacks this turn
	adv -= atkunit.hits;
	ddv -= defunit.hits;
	
	//TODO Range defense modifier AntiTank doesn't get it
	if (d > 1) 
	{
		adv += aData.rangedefmod;
		ddv += dData.rangedefmod;
	}
	else
	{
		adv += aData.rangedefmod >> 1;
		ddv += dData.rangedefmod >> 1;
	}
	//TODO Initiative
	if (aData.initialive > dData.initiative)
		adv += 4;
	
	if (atkunit.isSurprised)
	{
		adv = 0;
		aav = aav/2;
	}
	//console.log("Attacker attack value:" + aav + " defence value:" + adv);
	//console.log("Defender attack value:" + dav + " defence value:" + ddv);
	//We consider that attacking unit can fire because otherwise won't have targets selected in UI
	//Check if defending unit can fire back
	//Can't fire back when attacked from range
	if (d > 1) 
		cr.defcanfire = false;
	if (!canAttack(defunit, atkunit)) 
		cr.defcanfire = false;
	
	cr.kills = getCombatKills(aav, ddv, atkunit, defunit);
	
	if (cr.defcanfire)
			cr.losses = getCombatKills(dav, adv, defunit, atkunit);
	
	//Experience
	cr.atkExpGained = (((dav + 6 - adv) * defunit.strength / 10 + (ddv + 6 - aav)) * cr.kills) >> 0;
	cr.defExpGained = (2 * cr.losses) >> 0;
	//console.log("Attacked experience gained: " + cr.atkExpGained);
	//console.log("Defender experience gained: " + cr.defExpGained);

	return cr;
}