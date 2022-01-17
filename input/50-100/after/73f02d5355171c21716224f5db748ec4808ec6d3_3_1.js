function() {
			if(this._metamorph) {
				var oldContext = context(),
				    target = this.target(),
				    value = _.isFunction(target) ? target() : target; 
				
				context(this);
				this.disposeChildren();	
				this._metamorph.html(Handlebars.Utils.escapeExpression(this.renderContent(value)));

                this.trigger("attach");
				context(oldContext);
			}
		}