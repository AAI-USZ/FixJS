function() {
			if (!this.length) return 1;
			return this.last().get('order') + 1;
		}