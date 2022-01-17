function (e) {
		var newwindow = window.open(this.href, 'name', 'height=400,width=900, status=1, toolbar=1, resizable=1, scrollbars=1, menubar=1, location=1');
		if (window.focus) {
			newwindow.focus();
		}
		YAHOO.util.Event.preventDefault(e);
		return false;
	}