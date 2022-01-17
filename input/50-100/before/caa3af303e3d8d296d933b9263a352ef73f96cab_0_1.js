function() {
		this.contentView = new OsciTk.views[this.options.toolbarItem.view]({parent: this});
		this.$el.html(this.template({
			text: this.options.toolbarItem.text
		}));
	}