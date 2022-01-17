function(p) {
			text_data.position = p;
			text_data.angle += Math.PI / 50;
			text_data.angle %= 2 * Math.PI;
			return text_data;
		}