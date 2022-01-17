function(controller) {
		//Mojo.Log.info("Setup widget talk-favorite:", id);
		var widget = controller.get(that.widgetId);
		that.widgets.push({
			widget: widget,
			controller: controller
		});

		if (favorite.is(id)) {
			widget.addClassName("is-favorite");
		}

		controller.listen(widget, Mojo.Event.tap, that.changeFavorite);
	}