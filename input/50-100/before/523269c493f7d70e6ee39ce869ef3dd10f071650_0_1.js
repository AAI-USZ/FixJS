function(data) {
			self.trigger(Events.LEVEL_LEAVE, self.level.levelData);

			self.level.destroy();

			self.level = new Level(data);

			self.trigger(Events.LEVEL_ENTER, data);
		}