function(id) {
			var exports;

			if (id.indexOf('@') < 0) id += '@';

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