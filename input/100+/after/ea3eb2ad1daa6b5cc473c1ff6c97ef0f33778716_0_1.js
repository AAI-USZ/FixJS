function(payload) {
			var x = RelativeCoordEvent(payload.event).relativeX;
			var y = RelativeCoordEvent(payload.event).relativeY;
			var svg = view.draw.rect(x - wheelDef.width/2, y - wheelDef.height/2,
				wheelDef.width, wheelDef.height, wheelDef.radius);
			svg.attr(view.shapeAttributes);

			var wheel = Wheel2D(svg, {app: options.app});
			options.app.trigger(ApplicationEvents.wheelUpdated, {wheel: wheel});
		}