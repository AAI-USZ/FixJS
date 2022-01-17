function() {
            dojo.subscribe("/animwidget/selectObject", this, "onUpdate");
            dojo.subscribe("/animwidget/updateObject", this, "onUpdate");
            dojo.subscribe("/resourceitem/updateResource", this, "updateResourceList");
            
		}