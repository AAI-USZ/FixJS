function (node, callback) {
			if (-1 === node) {
				this._fetchRepoRoot(callback);
			} else {
				var obj = this._getObjectFromCache(node);
				if (typeof obj === 'object') {
					this.fetchChildren(obj, callback);
				}
			}
		}