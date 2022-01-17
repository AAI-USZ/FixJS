function () {

			try {
				return modulejs.require('ext/folderstatus');
			} catch (e) {}

			return [];
		}