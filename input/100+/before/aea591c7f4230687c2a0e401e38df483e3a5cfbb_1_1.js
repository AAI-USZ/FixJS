function(fn, scope) {
				var root = this.get('root'),
					children = this._node.children,
					child, ret;
				scope = scope || this;
				if (children && children.length) {
					Y.Array.each(children, function (node, index) {
						child = root._poolFetch(node);
						ret = fn.call(scope, child, index);
						root._poolReturn(child);
						return ret;
					});
				}
			}