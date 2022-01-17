function() {
		// render and place content
		this.$el.html(this.template({
			referenceImageUrl: this.referenceImageUrl,
			navTree: this.navTree
		}));

		// the reference image can throw off height calculation.  Rerender list after it loads
		var img = this.$el.find('#toc-reference-image img');
		if (img[0] && img[0].complete === false) {
			img.on('load', function() {
				app.views.tocView.renderCollapsibleList();
			});
		}
		else {
			this.renderCollapsibleList();
		}

		// bind handle to open/close panel
		this.$el.find('#toc-handle').on('click', this, function(event) {
			event.data.toggleDrawer();
		});
	}