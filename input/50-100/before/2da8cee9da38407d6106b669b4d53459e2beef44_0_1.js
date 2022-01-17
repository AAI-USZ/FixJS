function (selectionModel, record) {
		/* Right now, we support delete on a single record only */
		if (this.getSelectionModel().getCount() == 1 && record.get("footprintId")) {
			this.deleteButton.enable();
		} else {
			this.deleteButton.disable();
		}
	}