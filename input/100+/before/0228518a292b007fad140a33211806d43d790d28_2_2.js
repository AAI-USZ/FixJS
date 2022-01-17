function () {
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