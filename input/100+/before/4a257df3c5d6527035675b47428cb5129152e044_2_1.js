function drawPattern(context, ingredientNames) {
		_.each(ingredientNames, function(name) {
			var ingredient = ingredients.filterByName(name)[0];
			var imageUrl = ingredient.get('brush_image');
			var imageObj = new Image();

			imageObj.onload = function() {
				var pattern = context.createPattern(imageObj, "repeat");
				that.drawFilledCircle(context, that.xoffset, that.yoffset, that.radius + 10, pattern);
			};

			imageObj.src = imageUrl;
		});
	}