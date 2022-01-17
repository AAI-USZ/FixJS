function(){
			this.model =  Y.TreeModel;
			this.on('add', this._addInterceptor);
			this.on('remove', this._removeInterceptor);
			this.on('*:depthLevelChange', this._childDepthChanging);
			this.after('*:collapsedChange', this._childCollapsedChanged);
		}