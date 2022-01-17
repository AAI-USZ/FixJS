function(){
				//console.log("reminddlgCancel clicked ");
				domStyle.set(dom.byId("invalidDate"), "visibility", "hidden");
				registry.byId("datePicker").hide(false);
				var datamodel = itemlistmodel.model[this.app.selected_item];
				date = datamodel.get("reminderDate");
				if(!date){ // cancelled and no date set, so need to set 
					datamodel.set("reminderOnAday", "off");
				}
			}