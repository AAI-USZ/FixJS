function (t,record) {
			if (record.self.getName() == "PartKeepr.Footprint") {
				this.fireEvent("itemEdit", record.get("id"));
			}
		}