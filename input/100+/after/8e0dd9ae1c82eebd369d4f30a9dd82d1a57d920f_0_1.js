function(view, opt_params) {
    var urlTemplate = gadgets.config.get('views')[view].urlTemplate;
    var url = urlTemplate || 'OpenSocial.aspx?';

    url += window.location.search.substring(1);
    
    // remove appId if present
    url = my.removeParameterFromURL(url, 'appId');
    
    // Add appId if isOnlyVisible is TRUE for this view
    if (gadgets.config.get('views')[view].isOnlyVisible) {
        var moduleId = shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
        var appId = my.gadgets[moduleId].appId;
        url += (url.indexOf('?') != url.length - 1 ? '&' : '') + 'appId=' + appId;    
    }

	if (opt_params) {
		var paramStr = gadgets.json.stringify(opt_params);
		if (paramStr.length > 0) {
			url += (url.indexOf('?') != url.length  - 1 ? '&' : '') + 'appParams=' + encodeURIComponent(paramStr);
		}
	}
	if (url && document.location.href.indexOf(url) == -1) {
	    document.location.href = '/' + location.pathname.split('/')[1] + '/' + url;
	}
}