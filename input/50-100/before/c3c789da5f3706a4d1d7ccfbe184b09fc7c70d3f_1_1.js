function (data) {
		var id = data.record.get("manufacturer_id");
		
		var rec = PartKeepr.getApplication().getManufacturerStore().findRecord("id", id);
		
		if (rec) {
			data.record.set("manufacturer_name", rec.get("name"));
		}
	}