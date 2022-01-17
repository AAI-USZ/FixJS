function downloadXBMCFile(url,myFile,callback) {
	var inputUrl = '/xbmcCmds/xbmcHttp?command=FileDownloadFromInternet('+url+'; '+myFile+')';
	Ext.Ajax.request({
		url: inputUrl,
		method: 'GET',
		async: callback || false,
		success: callback || function (t){},
		failure: function(t){},
		timeout: 2000
	});
}