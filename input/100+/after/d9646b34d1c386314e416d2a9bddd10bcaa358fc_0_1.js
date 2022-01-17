function() {
	a2d.forceClear = true;
	a2d.on("load", function() {
		game.init();
	});

	a2d.on("draw", function() {
		if(game.world) {
			game.world.Step(0.12, 10, 10);
			game.world.ClearForces();
			if(game.player) {
				var p = game.player.position.clone(),
					parallax;
				p.X -= a2d.dimension.Width / 2;
				p.Y -= a2d.dimension.Height / 2;
				p.scale(new a2d.Position(-1, -1));
				if(p.X > 0) {
					p.X = 0;
				}
				if(p.X < -game.level.getWidth() * 64 + a2d.dimension.Width) {
					p.X = -game.level.getWidth() * 64 + a2d.dimension.Width;
				}
				game.level.offset = p;
				parallax = p.clone();
				parallax.divide(new a2d.Position(2, 2));
				game.city.offset = parallax;
				parallax2 = parallax.clone();
				parallax2.divide(new a2d.Position(2, 2));
				game.sky.offset = parallax2;
			}			
		}
	});
	var loading = new a2d.Label("loading...", { font : "72px fearless", position: new a2d.Position( a2d.dimension.Width / 2, a2d.dimension.Height / 2), color: "#FFFFFF", border: { width: 5, color: "#000000"} });
    a2d.on("progress", function(progress) {
    	var pct = (100.0 / progress.total) * progress.loaded;
    	loading.text = "loading ["  +  parseInt(pct, 10) + "%]";
    });
    a2d.on("load", function() {
    	a2d.root.remove(loading);
    });
	a2d.root.push(loading);
	a2d.load({	"dino" : "images/dinosaur.png",
				"tiles": "images/tiles.png",
				"meat" : "images/meat.png",
				"city" : "images/city.png",
				"sky"  : "images/sky.png",
				"grenade" : "images/grenade.png",
				"explosion" : "images/explosion.png",
				"dialog" : "images/intro.png",
				"explode" : "audio/Explosion13.wav",
				"blip" : "audio/Blip_Select.wav",
				"start": "audio/Randomize.wav",
				"coin" : "audio/Pickup_Coin.wav",
				"jump" : "audio/Jump5.wav",
				"shoot" : "audio/Laser_Shoot12.wav",				
				"music": "audio/beat_one.ogg" });
}