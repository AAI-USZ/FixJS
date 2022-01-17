function Setup()
	{
		// This is where teams will get created
		var currcolor = rndInt(0,TeamColors.length-1);
		for(var i=0; i<=NUM_TEAMS-1; i++, currcolor= (currcolor +1) % TeamColors.length)
			Teams[i] = new Team(TeamColors[currcolor],getName(4,7,null,null));

		// Init Pools
		Bullets.init();
		Smokes.init();
		Explosions.init();
		FlyingDebris.init();
	}