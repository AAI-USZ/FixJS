function (uri_bundle, view) {
			console.log('unmatched route');
			console.log(uri_bundle.uri);
			view.statusNotFound('404.html');
		}