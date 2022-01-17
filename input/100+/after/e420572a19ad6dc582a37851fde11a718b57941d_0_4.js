function path(url, depend) {

		if(/^https?:\/\//.test(url))

			return url;

		depend = depend || baseUrl;

		var temp = depend.slice(8).split('/');

		temp.pop();

		temp[0] = depend.slice(0, 8) + temp[0];

		if(url.charAt(0) == '/')

			return temp.join('/') + url;

		else if(url.indexOf('../') == 0) {

			while(url.indexOf('../') == 0) {

				url = url.slice(3);

				temp.pop();

			}

			return temp.join('/') + '/' + url;

		}

		else if(url.indexOf('./') == 0)

			url = url.slice(2);

		return temp.join('/') + '/' + url;

	}