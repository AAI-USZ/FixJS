function(failed, result) {
			this.then = failed ? function (resolved, rejected) { rejected && rejected(result); }
			                   : function (resolved) { resolved && resolved(result); };
			this._complete = noop;
			this.thens.forEach(function(t) {
				var cb = t[failed];
				cb && cb(result);
			});
			this.thens = 0;
		}