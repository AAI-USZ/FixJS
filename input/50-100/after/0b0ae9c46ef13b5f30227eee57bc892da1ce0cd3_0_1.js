function(widgetid){
		var datamodel = itemlistmodel.model[this.app.selected_item];
		var date = datamodel.get("reminderDate");
		if(!date){
			date = stamp.toISOString(new Date(), {selector: "date"});
		}
		//console.log("remind showDateDialog date = ", date);
		registry.byId("reminddlgpicker1").set("value", date);							
		registry.byId("datePicker").show(dom.byId(widgetid),['above-centered','below-centered','after','before']);
	}