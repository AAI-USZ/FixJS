function getPageTitle(aPageURL) {

	GM_xmlhttpRequest({

		method : 'GET',

		url    : aPageURL,

		onload : function(aState) {

			/<title>([^<]+)<\/title>/.test(aState.responseText);

			pageTitle = RegExp.$1;

		}

	});

}