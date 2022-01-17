function () {

			var location = document.location.pathname.replace(/[^\/]*$/, ''),
				testpathname = '/a b',
				a = document.createElement('a');

			a.href = testpathname;
			if (a.pathname === testpathname) {
				location = encodeURIComponent(location).replace(/%2F/ig, '/').replace(/'/g, '%27');
			}

			return location;
		}