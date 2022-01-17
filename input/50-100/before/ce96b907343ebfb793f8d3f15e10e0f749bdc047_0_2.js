function()
    {
        missiles = [];
		enemies = [];
		explosions = [];
		money = [];
		randomItems = [];
		totalDestroys = 0;
		destroys = 0;
        player.life = 100;
		player.shield = 100;
		player.recharge = true;
		totalShots = 0;
        player = new Player(24, 40);
		gco.bgm.pause();
		gco = new GameControlObject();
		gco.Init();
    }