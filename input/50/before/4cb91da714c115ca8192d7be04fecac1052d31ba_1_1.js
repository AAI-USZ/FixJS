function (klass) {
		var ctx = this;
		window.setTimeout(function () { $(ctx).removeClass(klass); }, 0);
	}