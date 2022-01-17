function(){

		//this._flowBox = new CheckBox({}, this.flowBoxNode);

		this._snap = new CheckBox({}, this.snapNode);

		this._showPossibleParents = new CheckBox({}, this.showPossibleParentsNode);

		this._cssOverrideWarn = new CheckBox({}, this.cssOverrideWarn);

		this._absoluteWidgetsZindex = new TextBox({}, this.absoluteWidgetsZindex);

		this._zazl = new CheckBox({}, this.zazl);

		if(!this.containerNode){

			this.containerNode = this.domNode;

		}

	}