function newContentFunction(type, contentParent){
		initAjaxUpload(type, contentParent);
		initFancyCoose(type, contentParent);
		initDatePicker(type, contentParent);
		if (type != 'initial'){
			initAutoFocus(type, contentParent);
		}
		initAjaxPaging(type, contentParent);
		updateHomeGPS(type, contentParent);
	}