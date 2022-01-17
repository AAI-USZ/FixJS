function(e) {
	let data = e.data.split(';');
	if(data[0] !== '_ExHentai') {
		return;
	}
	GM_xmlhttpRequest({
		method: "GET",
		url: data[1],
		overrideMimeType: 'text/plain; charset=x-user-defined',
		onload: function(e) {
			if(e.status === 200) {
				GM_openInTab('http://exhentai.org/?f_shash=' + sha1Hash(e.responseText) + '&fs_similar=1&fs_exp=1', false, true);
			} else {
				GM_log('Error: ' + e.statusText);
			}
		}
	});
}