function(){
        var playerSpeed = gameContainer.conf.get("PLAYER_SPEED");
        var playerSize = gameContainer.conf.get("PLAYER_SIZE");
		
    	var model = this;
//    	var entity = Crafty.e("2D, Canvas, malePlayer, KeyMoveControls, Mouse, Hero, Animate, Collision")
//    	var entity = Crafty.e("2D, Canvas, malePlayer, KeyMoveControls, Mouse, Hero")
	    var entity = Crafty.e("2D, DOM, mage, Mouse, Body, Pawn, Hero, BodyAnimations, Damageable, NavigationHandle, HeroControl, TextEx, AbilityUser, DebugRendering")
		    .attr({x: 160, y: 144, z: 1, w:playerSize, h:playerSize, Faction : Factions.Monk, MovementSpeed: 0.2 })
		    .text("Jia");

	    for (var slot in SpellBook)
	    {
		    var data = SpellBook[slot];
		    var ability = new data.Type();
		    for (var key in data)
		    {
			    if (key === "Type")
				    continue;

			    ability[key] = data[key];
		    }

		    entity.AddAbility(slot, ability);
	    }

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
			Crafty.viewport.scrollTo(-x0, -y0);
		};

	    // must bind to visual updated but not BodyMoved, otherwise could cause the map redraw twice
	    entity.bind("VisualUpdated", followCamera);

    	model.set({'entity' : entity });

	    this._setupAnimations();
    }