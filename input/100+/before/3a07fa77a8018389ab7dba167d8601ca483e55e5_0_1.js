function()
	{
		missiles = [];
		enemies = [];
		explosions = [];
		money = [];
		randomItems = [];
		totalDestroys += destroys;
		destroys = 0;
        //player.life = 100;
		initStars();
		player.shield = 100;
		player.recharge = true;
		totalShots += player.totalMissiles;
        player.totalMissiles = 0;
        player.x = _buffer.width / 2;
        player.y = _buffer.height / 2;
		gco.ResetFuel();
		gco.GoToUpgradeMenu();
		player.resetShield();
	}