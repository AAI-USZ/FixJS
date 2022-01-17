function() {
			rotation += Math.PI / 200;
			render();
			requestAnimationFrame(self.animate);
		}