function(){
		if(this.app.selected_configuration_item === -1){
			//undisplay "Complete" button
			domStyle.set(dom.byId("markAsComplete"), "display", "none");
		}else{
			domStyle.set(dom.byId("markAsComplete"), "display", "");
		}

		var datamodel = this.app.currentItemListModel.model[this.app.selected_item];
		if(!datamodel){
			return;
		}

		// we need to set the target for the group each time since itemlistmodel is reset for each list
		// the cursorIndex is set in the showItemDetails function in ViewListTodoItemsByPriority or ViewAllTodoItemsByDate 
		registry.byId("item_detailsGroup").set("target", at(this.app.currentItemListModel, "cursor"));

		if(!detailsSetup){  // these bindings only have to be setup once.
			detailsSetup = true;

			// Setup data bindings here for the fields inside the item_detailsGroup.
			// use at() to bind the attribute of the widget with the id to value from the model
			var bindingArray = [
				{"id":"detail_todo", "attribute":"value", "atparm1":'rel:', "atparm2":'title',"direction":at.both,"transform":null},
				{"id":"detail_reminderDate", "attribute":"value", "atparm1":'rel:', "atparm2":'reminderDate',"direction":at.both,"transform":null},			
				{"id":"detail_reminderDate", "attribute":"class", "atparm1":'rel:', "atparm2":'reminderDate',"direction":at.from,"transform":dateClassTransform2},			
				{"id":"detail_todoNote", "attribute":"value", "atparm1":'rel:', "atparm2":'notes',"direction":at.both,"transform":null},			
				{"id":"detail_repeat", "attribute":"rightText", "atparm1":'rel:', "atparm2":'repeat',"direction":at.from,"transform":repeatTransform},			
				{"id":"detail_priority", "attribute":"rightText", "atparm1":'rel:', "atparm2":'priority',"direction":at.from,"transform":priorityTransform},			
				{"id":"detail_list", "attribute":"rightText", "atparm1":'rel:', "atparm2":'listId',"direction":at.from,"transform":parentTitleTransform}
			];
			
			// bind all of the attrbutes setup in the bindingArray, this is a one time setup
			bindAttributes(bindingArray);
		}

		domStyle.set(dom.byId("detailwrapper"), "visibility", "visible"); // show the items list

	}