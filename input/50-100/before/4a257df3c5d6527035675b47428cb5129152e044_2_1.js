function() {
				var pattern = context.createPattern(imageObj, "repeat");
				that.drawFilledCircle(context, that.xoffset, that.yoffset, that.radius + 10, pattern);
			}