function(spec, favorite) {
	var that = spec,
	id = that.id,
	day_names = Mojo.Locale.getDayNames(),
	// Subtract 4 hours to adjust for the NYC timezone
	// because Mojo doesn't do that for me
	d = new Date((that.timestamp + ( -4 * 60 * 60 ) ) * 1000);

	that.widgetId = "talk-favorite-" + id;
	that.widgets = [];
	that.room = {};

	//Mojo.Log.info("Setup talk:", id);
	that.setup = function(controller) {
		//Mojo.Log.info("Setup widget talk-favorite:", id);
		var widget = controller.get(that.widgetId);
		that.widgets.push({
			widget: widget,
			controller: controller
		});

		if (favorite.is(id)) {
			widget.addClassName("is-favorite");
		}

		that.rooms.each(function(room) {
			that.room[ room.toLowerCase() ] = true;
		});

		controller.listen(widget, Mojo.Event.tap, that.changeFavorite);
	},

	that.cleanup = function() {
		//Mojo.Log.info("Cleanup talk:", this.id);
		var i;
		for (i = 0; i < this.widgets.length; i += 1) {
			this.widgets[i].controller.stopListening(this.widgets[i].widget, Mojo.Event.tap, this.changeFavorite);
		}
	}.bind(that),

	that.changeFavorite = function() {
		Mojo.Log.info("Changing Favorite:", this.widgetId);

		var value = ! favorite.is(this.id);
		favorite.set(this.id, value);

		var i, widget;
		for (i = 0; i < this.widgets.length; i += 1) {
			if (value) {
				this.widgets[i].widget.addClassName("is-favorite");
			}
			else {
				this.widgets[i].widget.removeClassName("is-favorite");
			}
		}
	}.bind(that);

	that.inLocation = function(location) {
		//Mojo.Log.info("inLocation: " + location);
		return that.room[ location.toLowerCase() ];
	}.bind(that);

	//that.date = d.toUTCString();
	that.day = day_names[d.getUTCDay()];
	that.hours = d.getUTCHours();
	if (that.hours < 10) {
		that.hours = "0" + that.hours;
	}
	that.minutes = d.getUTCMinutes();
	if (that.minutes < 10) {
		that.minutes = "0" + that.minutes;
	}

    that.when = that.day + "-" + that.hours + that.minutes;

	that.searchable = that.title.toLowerCase();
	that.searchable += " " + that.location.toLowerCase();
	that.searchable += " " + that.day.toLowerCase();

	for (s = 0; s < that.speakers.length; s += 1) {
		that.searchable += " " + that.speakers[s].name.toLowerCase();
	}

	return that;
}