function(newShape){
			// summary:
			//		sets a rectangle shape object (VML)
			// newShape: Object
			//		a rectangle shape object
			var shape = this.shape = g.makeParameters(this.shape, newShape);
			this.bbox = null;
			var r = Math.min(1, (shape.r / Math.min(parseFloat(shape.width), parseFloat(shape.height)))).toFixed(8);
			// a workaround for the VML's arcsize bug: cannot read arcsize of an instantiated node
			var parent = this.rawNode.parentNode, before = null;
			if(parent){
				if(parent.lastChild !== this.rawNode){
					for(var i = 0; i < parent.childNodes.length; ++i){
						if(parent.childNodes[i] === this.rawNode){
							before = parent.childNodes[i + 1];
							break;
						}
					}
				}
				parent.removeChild(this.rawNode);
			}
			if(has("ie") > 7){
				var node = this.rawNode.ownerDocument.createElement("v:roundrect");
				node.arcsize = r;
				node.style.display = "inline-block";
				this.rawNode = node;
				this.rawNode.__gfxObject__ = this.getUID();						
			}else{
				this.rawNode.arcsize = r;
			}
			if(parent){
				if(before){
					parent.insertBefore(this.rawNode, before);
				}else{
					parent.appendChild(this.rawNode);
				}
			}
			var style = this.rawNode.style;
			style.left   = shape.x.toFixed();
			style.top    = shape.y.toFixed();
			style.width  = (typeof shape.width == "string" && shape.width.indexOf("%") >= 0)  ? shape.width  : Math.max(shape.width.toFixed(),0);
			style.height = (typeof shape.height == "string" && shape.height.indexOf("%") >= 0) ? shape.height : Math.max(shape.height.toFixed(),0);
			// set all necessary styles, which are lost by VML (yes, it's a VML's bug)
			return this.setTransform(this.matrix).setFill(this.fillStyle).setStroke(this.strokeStyle);	// self
		}