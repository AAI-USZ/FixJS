function(view) {
		if ((this.activeToolbarItemView && view.cid !== this.activeToolbarItemView.cid) || this.activeToolbarItemView === undefined) {
			this.activeToolbarItemViewChanged = true;
		} else {
			this.activeToolbarItemViewChanged = false;
		}
		this.activeToolbarItemView = view;
		this.$el.find("#toolbar-content").html(view.contentView.$el);

		return this;
	}