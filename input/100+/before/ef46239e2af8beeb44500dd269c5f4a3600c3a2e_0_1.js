function(){
			if(!this.label && this.srcNodeRef){
				this.label = this.srcNodeRef.innerHTML;
			}
			this.label = lang.trim(this.label);
			this.domNode = (this.srcNodeRef && this.srcNodeRef.tagName === "SPAN") ?
				this.srcNodeRef : domConstruct.create("span");
			this.inherited(arguments);

			if(this.light && !this.arrow && (!this.icon || !this.label)){
				this.labelNode = this.tableNode = this.bodyNode = this.iconParentNode = this.domNode;
				domClass.add(this.domNode, this.defaultColor + " mblToolBarButtonBody" +
							 (this.icon ? " mblToolBarButtonLightIcon" : " mblToolBarButtonLightText"));
				return;
			}

			this.domNode.innerHTML = "";
			if(this.arrow === "left" || this.arrow === "right"){
				this.arrowNode = domConstruct.create("span", {
					className: "mblToolBarButtonArrow mblToolBarButton" +
					(this.arrow === "left" ? "Left" : "Right") + "Arrow"
				}, this.domNode);
				domClass.add(this.domNode, "mblToolBarButtonHas" +
					(this.arrow === "left" ? "Left" : "Right") + "Arrow");
			}
			this.bodyNode = domConstruct.create("span", {className:"mblToolBarButtonBody"}, this.domNode);
			this.tableNode = domConstruct.create("table", {cellPadding:"0",cellSpacing:"0",border:"0"}, this.bodyNode);

			var row = this.tableNode.insertRow(-1);
			this.iconParentNode = row.insertCell(-1);
			this.labelNode = row.insertCell(-1);
			this.iconParentNode.className = "mblToolBarButtonIcon";
			this.labelNode.className = "mblToolBarButtonLabel";

			if(this.icon && this.icon !== "none" && this.label){
				domClass.add(this.domNode, "mblToolBarButtonHasIcon");
				domClass.add(this.bodyNode, "mblToolBarButtonLabeledIcon");
			}

			domClass.add(this.bodyNode, this.defaultColor);
			var _this = this;
			setTimeout(function(){ // for programmatic instantiation
				_this._updateArrowColor();
			}, 0);
			if(!has("webkit")){
				var cntr = 0;
				this._timer = setInterval(function(){ // compat mode browsers need this
					if(_this._updateArrowColor() || cntr++ > 3){
						clearInterval(_this._timer);
					}
				}, 500);
			}
		}