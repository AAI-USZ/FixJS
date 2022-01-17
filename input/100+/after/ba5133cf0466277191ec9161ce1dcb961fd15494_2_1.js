function(how) {
			// no arg. natural sort
			if (!how) {
				this._models.sort();
				return this.fireEvent('sort');
			}

			// callback function
			if (typeof how === 'function') {
				this.model.sort(how);
				return this.fireEvent('sort');
			}

			// string keys, supports `:asc` (default) and `:desc` order
			var type = 'asc',
				pseudos = how.split(':'),
				key = pseudos[0],
				c = function(a, b) {
					if (a < b)
						return -1;
					if (a > b)
						return 1;
					return 0;
				};

			// do we have order defined? override type.
			pseudos[1] && (type = pseudos[1]);

			this._models.sort(function(a, b) {
				var ak = a.get(key),
					bk = b.get(key),
					map = {
						asc: c(ak, bk),
						desc: c(bk, ak)
					};

				// unknown types are ascending
				if (typeof map[type] == 'undefined')
					type = 'asc';

				return map[type];
			});

			return this.fireEvent('sort');
		}