function(f) {
			image_data.angle += Math.PI / 360;
			image_data.angle %= 2 * Math.PI;
			image_data.frame += 1;
			return image_data;
		}