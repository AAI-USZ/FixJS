function(declare, _Widget, _TemplatedMixin, _Templated, script, domConstruct, template, ResourceManager) {
     
	return declare("widgets.AnimDetailsWidget", [_Widget, _TemplatedMixin], {
        templateString: template,
		
		
		postCreate: function() {
            dojo.subscribe("/animwidget/selectObject", this, "onUpdate");
            dojo.subscribe("/animwidget/updateObject", this, "onUpdate");
            dojo.subscribe("/resourceitem/updateResource", this, "updateResourceList");
            
		},
		
		onUpdate: function (obj) {
		    if (obj !== undefined) {
                this.setValue(obj.getX(), this.transformX);
                this.setValue(obj.getY(), this.transformY);
                this.setValue(obj.getWidth(), this.width);
                this.setValue(obj.getHeight(), this.height);
                this.setValue(obj.getRotation(), this.rotation);
                this.setValue(obj.getRefX(), this.refX, "0.5");
                this.setValue(obj.getRefY(), this.refY, "0.5");
                this.setValue(obj.getZIndex(), this.zIndex);
                this.setValue(obj.getScaleX(), this.scaleX, "1");
                this.setValue(obj.getScaleY(), this.scaleY, "1");
                if (obj.getType() === "Sprite") {
                    this.resourceKeyTr.style.display = "";
                    this.setValue(obj.getResourceKey(), this.resourceKey, "");
                } else {
                    this.resourceKeyTr.style.display = "none";
                }
		        
		    }
		},
		
		updateResourceList: function() {
		    var resourceList = ResourceManager.getKeyList();
		    this.resourceKey.innerHTML = "";
		    for (var key in resourceList) {
		        
		        dojo.create("option", {
                    value: resourceList[key]
                }, this.resourceKeyDataList);
		    }
		    
		},
		
		setValue: function (val, node, defaultVal) {
		    if (node !== undefined) {
		        if (val !== undefined) {
		            node.value = val;
		        } else {
		            node.value = defaultVal | "0";
		        }
                
            }
		},
		
		changeValue: function (event) {
            var change = {};
            if (this.id == event.data.transformX.id) {
                change.x = this.value;
            } else if (this.id == event.data.transformY.id) {
                change.y = this.value;
            } else if (this.id == event.data.width.id) {
                change.width = this.value;
            } else if (this.id == event.data.height.id) {
                change.height = this.value;
            } else if (this.id == event.data.rotation.id) {
                change.rotation = this.value;
            } else if (this.id == event.data.refX.id) {
                change.refX = this.value;
            } else if (this.id == event.data.refY.id) {
                change.refY = this.value;
            } else if (this.id == event.data.zIndex.id) {
                change.zIndex = this.value;
            } else if (this.id == event.data.scaleX.id) {
                change.scaleX = this.value;
            } else if (this.id == event.data.scaleY.id) {
                change.scaleY = this.value;
            } else if (this.id == event.data.resourceKey.id) {
                change.resourceKey = this.value;
            }
            
            
            dojo.publish("/animdetailswidget/updateSelectedObject", [change]);
		},
		
		startup: function () {
            this.transformX = dojo.byId("transformX");
            this.transformY = dojo.byId("transformY");
            this.width = dojo.byId("width");
            this.height = dojo.byId("height");
            this.rotation = dojo.byId("rotation");
            this.refX = dojo.byId("refX");
            this.refY = dojo.byId("refY");
            this.zIndex = dojo.byId("zIndex");
            this.scaleX = dojo.byId("scaleX");
            this.scaleY = dojo.byId("scaleY");
            this.resourceKey = dojo.byId("resourceKey");
            this.resourceKeyDataList = dojo.byId("resourceKeyDataList");
            
            this.resourceKeyTr = dojo.byId("resourceKeyTr");
            $("#transformX").bind("change", this, this.changeValue);
            $("#transformY").bind("change", this, this.changeValue);
            $("#width").bind("change", this, this.changeValue);
            $("#height").bind("change", this, this.changeValue);
            $("#rotation").bind("change", this, this.changeValue);
            $("#refX").bind("change", this, this.changeValue);
            $("#refY").bind("change", this, this.changeValue);
            $("#zIndex").bind("change", this, this.changeValue);
            $("#scaleX").bind("change", this, this.changeValue);
            $("#scaleY").bind("change", this, this.changeValue);
            $("#resourceKey").bind("change", this, this.changeValue);
            
            
            
            this.updateResourceList();
		}
    });
     
}