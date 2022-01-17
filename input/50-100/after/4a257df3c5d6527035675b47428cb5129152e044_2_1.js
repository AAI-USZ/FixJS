function(name) {
			var ingredient = ingredients.filterByName(name)[0];
			var imageUrl = ingredient.get('brush_image');
			var imageObj = new Image();

			// Images are loaded asynchronously so the drawing
			// needs to be handled by a callback function.
			imageObj.onload = function() {
				var pattern = context.createPattern(imageObj, "repeat");
				that.drawFilledCircle(context, that.xoffset, that.yoffset, that.radius + 10, pattern);
			};

			imageObj.src = imageUrl;
		}