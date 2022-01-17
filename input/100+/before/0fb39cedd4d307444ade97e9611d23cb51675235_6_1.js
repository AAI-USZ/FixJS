function(){
        var playerSpeed = gameContainer.conf.get("PLAYER_SPEED");
        var playerSize = gameContainer.conf.get("PLAYER_SIZE");
		
    	var model = this;
//    	var entity = Crafty.e("2D, Canvas, malePlayer, KeyMoveControls, Mouse, Hero, Animate, Collision")
//    	var entity = Crafty.e("2D, Canvas, malePlayer, KeyMoveControls, Mouse, Hero")
	    var entity = Crafty.e("2D, DOM, maleNaked, Mouse, Body, BodyAnimations, Damageable, NavigationHandle, HeroControl, Text, AbilityUser")
		    .attr({x: 160, y: 144, z: 1, w:playerSize, h:playerSize, IsStatic:false, Faction : Factions.Monk, MovementSpeed: 0.2 })
		    .text("Jia")
		    .WalkAnimation(9, [0, 1, 2, 3], 5)
		.AddAbility("Primary", new Ability_Shoot())

		var followCamera = function()
		{
			//if (this._x === undefined || this._y === undefined)
			//	return;
			var center = this.GetCenterReal();
			var x0 = center.x - Crafty.viewport.width / 2,
				y0 = center.y - Crafty.viewport.height / 2;
			if (x0 < 0) x0 = 0;
			if (y0 < 0) y0 = 0;
//			if (x0 + Crafty.viewport.width > tileMap._width)
//				x0 = tileMap._width - Crafty.viewport.width;
//			if (y0 + Crafty.viewport.height > tileMap._height)
//				y0 = tileMap._height - Crafty.viewport.height;
			Crafty.viewport.x = -x0;
			Crafty.viewport.y = -y0;
		};

	    entity.bind("Appeared", followCamera);
	    entity.bind("BodyMoved", followCamera);

    	model.set({'entity' : entity });
    }