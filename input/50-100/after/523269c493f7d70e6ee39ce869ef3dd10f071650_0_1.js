function() {
				self.level = new Level(data);

				self.trigger(Events.LEVEL_ENTER, data);
			}