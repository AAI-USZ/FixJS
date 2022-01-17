function(payload) {
			var x = OffsetEvent(payload.event).offsetX;
			var y = OffsetEvent(payload.event).offsetY;
			var svg = view.draw.rect(x - wheelDef.width/2, y - wheelDef.height/2,
				wheelDef.width, wheelDef.height, wheelDef.radius);
			svg.attr(view.shapeAttributes);

			var wheel = Wheel2D(svg, {app: options.app});
		}