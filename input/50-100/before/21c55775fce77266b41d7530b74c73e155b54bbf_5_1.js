function(id, type, pos)
	{
		id = id || this.Regions.length;

		var region = this.RegionFactory.Spawn(this, id, type, pos);

		this.Regions.push(region);
		return region;
	}