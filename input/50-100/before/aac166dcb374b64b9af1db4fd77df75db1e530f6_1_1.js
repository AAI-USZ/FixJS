function(m) {
			if (this.row_views[m.id] !== undefined) { throw new Error("Cannot add view twice"); }
			var rw = new RowView({model:m, columns:this.options.columns});
			this.row_views[m.id] = rw;
			this.$el.find('tbody').append(rw.render());
		}