function generatePlayerobj(x)
	{
		for (var i=0; i<x; i++){
			playerObj[i]=refPlayerObj[i];
			config.player[playerObj[i].spriteposition].taken = true;
		}
	}