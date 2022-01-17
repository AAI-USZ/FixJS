function() {
		var id = this._params.jsId,
			dj = require("davinci/ve/widget")._dojo(this.domNode);
		if(id) {
			this.domNode.setAttribute("jsId", id);
			var type = this.getObjectType();
			if(type) {
				var c = dj.getObject(type);
				if(c) {
					var object = undefined;
					if(c.markupFactory) {
						object = c.markupFactory(this._params, this.domNode, c);
					}else if(c.prototype && c.prototype.markupFactory) {
						object = c.prototype.markupFactory(this._params, this.domNode, c);
					}else{
						object = new c(this._params, this.domNode);
					}
					if(object) {
						object._edit_object_id = id;
						dj.setObject(id, object);
					}
				}
			}
		} else {
			id =this.getObjectId();
			if(id) {
				var object = dj.getObject(id);
				if(object) {
					object._edit_object_id = id;
				}
			}
		}
	}