function newContentFunction(type, contentParent){
		if (typeof(contentParent) === 'undefined') return;
		initAjaxUpload(type, contentParent);
		initFancyCoose(type, contentParent);
		initDatePicker(type, contentParent);
		if (type != 'initial'){
			initAutoFocus(type, contentParent);
		}
		initAjaxPaging(type, contentParent);
		updateHomeGPS(type, contentParent);
	}