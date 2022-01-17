function() {
			this.$el.empty();
			this.collection.each(this.add, this);
		}