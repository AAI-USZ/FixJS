function(){
				if (this._cssPos === 'absolute') {
					return this.attributes.zIndex;
				}
				var z = this.attributes.zIndex+1,
					scope = this;
				_.each(scope.current, function(view) {
					z = view.zIndex > z ? view.zIndex : z;
				});
				return ++z;
			}