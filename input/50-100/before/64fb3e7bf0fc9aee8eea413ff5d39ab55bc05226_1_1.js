function()
	{
		for (var terrainName in TerrainDefinitions)
		{
			var terrainDef = TerrainDefinitions[terrainName];
			var terrain = new Terrain();

			var numSprites = terrainDef.Sprites.length;
			for (var i = 0; i < numSprites; i++)
			{
				terrain._entities[i] = Crafty.e("2D, " + terrainDef.Sprites[i]);
			}
			this[terrainName] = terrain;
		}
	}