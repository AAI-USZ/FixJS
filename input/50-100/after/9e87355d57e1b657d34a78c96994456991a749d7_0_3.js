function() {
			var instance = this;
			var displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

			return Math.ceil(displayDaysInterval / WEEK_LENGTH);
		}