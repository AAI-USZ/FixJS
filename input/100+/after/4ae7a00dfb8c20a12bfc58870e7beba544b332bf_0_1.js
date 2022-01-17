function (value) {
					this._node.expanded = value = !!value;
					var s, depth, n = Y.one('#' + this.get('id'));
					if (value && !this._node._childRendered) {
						this._node._childRendered = true;
						s = '';
						depth = this.get('depth');
						this.forEachChild(function (fwNode, index, array) {
							s += fwNode._getHTML(index, array.length, depth + 1);
						});
						n.one('.' + FWM.CNAME_CHILDREN).setContent(s);
					}
					if (value) {
						n.replaceClass(FWM.CNAME_COLLAPSED, FWM.CNAME_EXPANDED);
					} else {
						n.replaceClass(FWM.CNAME_EXPANDED, FWM.CNAME_COLLAPSED);
					}
				}