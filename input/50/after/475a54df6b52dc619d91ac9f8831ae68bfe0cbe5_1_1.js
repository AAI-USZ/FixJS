function (data, status) {
			if(typeof data != "object"){
				location = location.protocol + "//" + location.host + "?returnUrl=" + location.pathname;
				return;
			}
			liToRemove.remove();
		}