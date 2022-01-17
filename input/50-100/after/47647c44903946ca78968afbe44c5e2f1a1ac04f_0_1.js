function(id) {
			var exports;

			if (id.indexOf(ID_SEP) < 0) id += ID_SEP;

			for (var _id in depslist) {
				if (_id.lastIndexOf(id) >=0) {
					exports = depslist[_id];
					break;
				}
			};
			
			if (exports) {
				return exports;
			} else {
				throw new Error('no dependence for ' + id);
			}
		}