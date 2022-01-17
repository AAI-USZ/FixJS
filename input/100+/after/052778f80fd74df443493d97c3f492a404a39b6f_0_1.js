function(x,y) {
      for(var entity in game.getEntities(x,y)) {
	entity = game.getEntities(x,y)[entity];
	if(entity instanceof EntityOverlay) { entity.purge(); }
      }
      for(var overlay in game.getTile(x,y).overlays) {
	overlay = game.getTile(x,y).overlays[overlay];
	overlay.x = x;
	overlay.y = y;
	var tempEnt = new EntityOverlay(overlay,self);
      }
    }