function(){
			// summary:
			//		startup widgets in view template.
			// tags:
			//		private

			this._widget = this.render(this.templateString);
			// bind view level data model
			this.domNode = this._widget.domNode;
			this.parent.domNode.appendChild(this.domNode);

			//start widget
			this._widget.startup();

			// set widget attributes
			dattr.set(this.domNode, "id", this.id);
			dattr.set(this.domNode, "region", "center");
			dattr.set(this.domNode, "style", "width:100%; height:100%");
			this._widget.region = "center";

			//mixin view lifecycle implement
			if (this._definition) {
				lang.mixin(this, this._definition);
			}

			// call view assistant's init() method to initialize view
			this.app.log("  > in app/View calling init() name=[",this.name,"], parent.name=[",this.parent.name,"]");
			this.init();
			this._started = true;
			if(this._startDef){
				this._startDef.resolve(this);
			}
		}