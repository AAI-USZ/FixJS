function(env){
		//現在の状況すべて
		console.log("init!");
		console.log(JSON.stringify(env));
		game.objects.length=0;
		//console.log(env);
		for(var i=0,l=env.length;i<l;i++){
			//ひとつずつ追加
			executeJSON(game,env[i]);
		}


	}