function(){
				//console.log("reminddlgSet clicked ");
				// update remind on a day value to the data model
				var datamodel = this.loadedModels.itemlistmodel.model[this.app.selected_item];
				date = registry.byId("reminddlgpicker1").get("value");
				// have to check to see if the date is valid
				var todayDate = stamp.toISOString(new Date(), {selector: "date"});
				if(date < todayDate){
					domStyle.set(dom.byId("invalidDate"), "visibility", "visible");
					registry.byId("reminddlgpicker1").set("value", todayDate);							
					
				}else{
					datamodel.set("reminderDate", date);
					domClass.remove(registry.byId('remind_date').domNode, "dateLabelInvalid");
					registry.byId("datePicker").hide(true);
					domStyle.set(dom.byId("invalidDate"), "visibility", "hidden");
				}
			}