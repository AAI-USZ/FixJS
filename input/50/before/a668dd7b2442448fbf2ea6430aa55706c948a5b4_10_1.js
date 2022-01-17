function(e) {
		self.fireEvent('itemSelected', {
			name:e.rowData.title,
			position:e.rowData.position
		});
	}