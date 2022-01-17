function(){
			this.inherited(arguments);
			dojo.connect(this.folderName, "onkeyup", this, '_checkValid');
			/* set a default value */
			if(!this._value){
				this._setRootAttr(this._getRootAttr());
			}
		}