function (nodes, callback) {
			if (-1 === nodes) {
				this._fetchRepoRoot(callback);
			} else {
				var i;
				for (i = 0; i < nodes.length; i++) {
					var obj = this._getObjectFromCache(nodes.eq(i));
					if (obj) {
						this.fetchChildren(obj, callback);
					}
				}
			}
		}