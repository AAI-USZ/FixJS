function(params) {
				var values = this.properties.__values__;
				values.width = params.isParentSize.width ? UI.SIZE : "100%";
				values.height = params.isParentSize.height ? UI.SIZE : "100%";
				
				return Widget.prototype._doLayout.call(this,params);
			}