function(p) {
			image_data.position = p;
			image_data.angle += Math.PI / 50;
			image_data.angle %= 2 * Math.PI;
			return image_data;
		}