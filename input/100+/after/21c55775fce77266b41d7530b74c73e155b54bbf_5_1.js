function()
	{
		//////////////////////////////////////////////////////////////////////////////////////////
		// Member Variables
		//////////////////////////////////////////////////////////////////////////////////////////

		this.TileSize = gameContainer.conf.get("TILE_SIZE");
		this.MapWidth = gameContainer.conf.get("MAP_WIDTH");
		this.MapHeight = gameContainer.conf.get("MAP_HEIGHT");
		this.PhysicalWidth = this.MapWidth * this.TileSize;
		this.PhysicalHeight = this.MapHeight * this.TileSize;

		this.CollisionMap = new CollisionMap(this.MapWidth, this.MapHeight);
		this.TerrainManager = new TerrainManager();
		this.Regions = [];
		this.RegionFactory = new RegionFactory();

		this.PickupMap = new CollisionMap(this.MapWidth, this.MapHeight);

		this._staticEntities = [];
		this._terrainMap = [];
		this._spawnPoint = [];

		this._pawns = [];
		this._pawns[Factions.Neutral] = [];
		this._pawns[Factions.Monk] = [];
		this._pawns[Factions.Ghost] = [];

		this._projectileFactory = new ProjectileFactory();

		//////////////////////////////////////////////////////////////////////////////////////////
		// Initialization
		//////////////////////////////////////////////////////////////////////////////////////////

		NavigationManager.SetWorld(this);

		this.InitMapData();

		this.TileMap = Crafty.e("2D, Canvas, TileMap, Mouse")
			.attr({x: 0, y: 0, z: 0, w:this.PhysicalWidth, h:this.PhysicalHeight, World : this})
			.randomGenerate(this.MapWidth, this.MapHeight, this.TileSize)
			.bind("MouseDown", function(e){ Crafty.trigger('MapMouseDown', e); })
			.bind("MouseUp", function(e){ Crafty.trigger('MapMouseUp', e); })
			.bind("MouseMove", function(e){ Crafty.trigger('MapMouseMove', e); });

		this._activateInitialRegions();
	}