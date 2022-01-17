function downloadXBMCFile(url,myFile) {
	var inputUrl = '/xbmcCmds/xbmcHttp?command=FileDownloadFromInternet('+url+'; '+myFile+')';
	Ext.Ajax.request({
		url: inputUrl,
		method: 'GET',
		async: false,
		success: function (t){},
		failure: function(t){},
		timeout: 2000
	});
}