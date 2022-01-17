function() {
		    dojo.create("link", {rel: "stylesheet", href: "./widgets/templates/css/animdetailswidget.css" }, dojo.query("head")[0]);
            dojo.subscribe("/animwidget/selectObject", this, "onUpdate");
            dojo.subscribe("/animwidget/updateObject", this, "onUpdate");
            dojo.subscribe("/resourceitem/updateResource", this, "updateResourceList");
            
		}