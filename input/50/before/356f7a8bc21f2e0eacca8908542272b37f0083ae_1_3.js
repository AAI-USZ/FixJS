function getServicesPageTitle() {

	GM_xmlhttpRequest({

		method : 'GET',

		url    : 'http://www.clear-code.com/services/',

		onload : function(aState) {

			/<title>([^<]+)<\/title>/.test(aState.responseText);

			servicePageTitle = RegExp.$1;

		}

	});

}