function (t,record) {
			if (record.get("footprintId")) {
				this.fireEvent("itemEdit", record.get("footprintId"));
			}
		}