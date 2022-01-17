function()
	{
		missiles = [];
		enemies = [];
		explosions = [];
		money = [];
		randomItems = [];
		totalDestroys += destroys;
		destroys = 0;
        if(!player.isAlive()){player.life = 100;}
		initStars();
		totalShots += player.totalMissiles;
        player.totalMissiles = 0;
        player.x = _buffer.width / 2;
        player.y = _buffer.height / 2;
		gco.ResetFuel();
		gco.GoToUpgradeMenu();
		player.resetShield();
	}