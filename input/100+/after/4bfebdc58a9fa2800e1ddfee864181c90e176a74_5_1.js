function() {
		    // Add Stylesheets to the head
            if (dojo.query("link[href=./engine/css/style.css]").length < 1) {
                dojo.create("link", {rel: "stylesheet", href: "./engine/css/style.css" }, dojo.query("head")[0]);
                dojo.create("link", {rel: "stylesheet", href: "./widgets/templates/css/animwidget.css" }, dojo.query("head")[0]);
            }
            dojo.subscribe("/layerwidget/selectLayer", this, "onSelect");
            
            dojo.subscribe("/animdetailswidget/updateSelectedObject", this, "onUpdateSelected");
            dojo.subscribe("/animtimelinewidget/updateObject", this, "onUpdateObject");
            dojo.subscribe("/layerwidget/updateObject", this, "onUpdateObject");
            dojo.subscribe("/layerwidget/updateLayerPosition", this, "onUpdateObjectLayers");
            dojo.subscribe("/menuwidget/addObject", this, "onAddObject");
            dojo.subscribe("/menuwidget/newProject", this, "onNewProject");
            dojo.subscribe("/scenewidget/activatescene", this, "onActivateScene");
            dojo.subscribe("/menuwidget/playAnimation", this, "onPlayAnimation");
            dojo.subscribe("/animtimelinewidget/playAnimation", this, "onPlayAnimation");
            dojo.subscribe("/animtimelinewidget/stopAnimation", this, "onStopAnimation");
            
		}