function(declare, _Widget, _Templated, script, domConstruct, AnimEn) {
     
	return declare("widgets.JSONView", [_Widget, _Templated], {
        jsonStr: "fdgd",
        activeScene: null,
        scenes: null,
        templateString: "<div style='height: 98%; width: 100%;'><textarea id='jsonEditor' style='height: 98%; width: 100%;'>${jsonStr}</textarea></div>",
        
		postCreate: function() {
			var that = this;
			dojo.subscribe("/animwidget/update", this, "onUpdate");
            dojo.subscribe("/scenewidget/activatescene", this, "onActivateScene");
			this.scenes = AnimEn.getInst().getAllScenes();
		},
		onActivateScene: function(scene) {
			this.activeScene = scene;
		},
		onUpdate: function(object) {
	        if(object !== undefined && this.activeScene != null) {
	            var obj = object.toJSON();
	            
	            this.scenes[this.activeScene] = obj;
	            //if (obj.children !== undefined) {
	            //    obj = obj.children;
	            //}
	            
	            //jsonStr = dojo.toJson(obj, true);
	            jsonStr = JSON.stringify(this.scenes, null, 2);
	            dojo.query('#jsonEditor')[0].value = jsonStr;
	            
	            localStorage.setItem("animation", jsonStr);
	            var blub;
	        }
	    }
    });
     
}