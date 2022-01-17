function(){
		this.inherited(arguments);
		this._animConnects = [];

		this._isHorizontal = true;
		
		if(lang.isString(this.easeOut)){
			this.easeOut = lang.getObject(this.easeOut);
		}
		if(lang.isString(this.easeIn)){
			this.easeIn = lang.getObject(this.easeIn);
		}
	
		var thisClass = "", rtl = !this.isLeftToRight();
		if(this.region){
			switch(this.region){
				case "trailing" :
				case "right" :
					thisClass = rtl ? "Left" : "Right";
					this._needsPosition = "left";
					break;
				case "leading" :
				case "left" :
					thisClass = rtl ? "Right" : "Left";
					break;
				case "top" :
					thisClass = "Top";
					break;
				case "bottom" :
					this._needsPosition = "top";
					thisClass = "Bottom";
					break;
			}
			domClass.add(this.domNode, "dojoxExpando" + thisClass);
			domClass.add(this.iconNode, "dojoxExpandoIcon" + thisClass);
			this._isHorizontal = /top|bottom/.test(this.region);
		}
		domStyle.set(this.domNode, {
			overflow: "hidden",
			padding:0
		});
		
		this.connect(this.domNode, "ondblclick", this.previewOnDblClick ? "preview" : "toggle");
		
		this.iconNode.setAttribute("aria-controls", this.id);
		
		if(this.previewOnDblClick){
			this.connect(this.getParent(), "_layoutChildren", lang.hitch(this, function(){
				this._isonlypreview = false;
			}));
		}
		
	}