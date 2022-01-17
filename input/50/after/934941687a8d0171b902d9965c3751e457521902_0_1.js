function(e) {
		detailView.fireEvent('itemSelected',e);
		self.parentTab.open(detailContainerWindow);
	}