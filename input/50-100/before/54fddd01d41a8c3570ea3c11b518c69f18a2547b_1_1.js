function (request_params) {
        if (request_params && request_params.popup) {
			var uo = new UiOverlay();
			uo.show(request_params.popup);
        }
        else {
			var uo = new UiOverlay();
			uo.hide();
        }
    }