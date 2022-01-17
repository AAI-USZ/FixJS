function(path) {
		if (this.level) {
			this.level.unload();
		}

		this.level = new Level(path, this._physicsEngine);
		this.level.loadLevelInToEngine();
	}