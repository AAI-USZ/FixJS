function generatePlayerobj(x)
	{
		for (var i=0; i<x; i++){
			//console.log(refPlayerObj[i]);
			playerObj[i]=refPlayerObj[i];
			config.player[playerObj[i].spriteposition].taken = true;
		}
		//console.log(config.player);
	}