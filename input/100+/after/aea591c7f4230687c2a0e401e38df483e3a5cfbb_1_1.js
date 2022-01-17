function() {
				// assumes that if you asked for the HTML it is because you are rendering it
				this._node._rendered = true;
				var attrs = this.getAttrs(),
					s = '', 
					templ = this.get('template') || this.constructor.TEMPLATE || this.get('root').get('nodeTemplate');
				if (this.get('expanded')) {
					this._node._childRendered = true;
					this.forEachChild( function (fwNode) {
						s += fwNode._getHTML();
					});
				}
				attrs.children = s;
				attrs.cname_node = FWM.CNAME_NODE;
				attrs.cname_children = FWM.CNAME_CHILDREN;
				
				return Lang.sub(templ, attrs);
				
			}