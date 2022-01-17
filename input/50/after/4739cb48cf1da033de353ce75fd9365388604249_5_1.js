function(e) {
		self.fireEvent('itemSelected', {
			name:e.rowData.title,
		});
	}