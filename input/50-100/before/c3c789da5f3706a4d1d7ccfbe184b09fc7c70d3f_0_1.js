function(data) {
		var id = data.record.get("distributor_id");

		var rec = PartKeepr.getApplication().getDistributorStore().findRecord("id", id);

		if (rec) {
			data.record.set("distributor_name", rec.get("name"));
		}
	}