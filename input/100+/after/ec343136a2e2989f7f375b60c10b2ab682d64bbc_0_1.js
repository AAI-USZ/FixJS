function Creature(centerTile, renderer) {
	this.name = "Magma Spawn";
	// collision map:
	// 0 does not collide on this tile
	// 1 collides on this tile
	// 2 blocks tile for creatures, but does not collide with terrain (flying)
	this.collisionMap = [
		[1,1,1]
	];

	// TODO move into Sprite class
	this.position = Vector2D(0,0);
	this.size = new Vector2D(3,2.3); //TODO set size relative to tileSize
	this.texturePosition = new Vector2D(0,0);
	this.textureSize = new Vector2D(275, 211);
	this.footOffset = new Vector2D(1, 1.7); //TODO set as pixel and convert
//	this.footPosition.toUnitSpace(renderer); 

	this.image = "../bestiary/Magma Spawn/cardboard.png";
	renderer.fetchTexture("../bestiary/Magma Spawn/cardboard.png", this.onReady);

	this.setAtTile(centerTile); //TODO add a check if is free
}