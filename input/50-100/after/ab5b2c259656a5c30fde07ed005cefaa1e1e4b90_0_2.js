function updateClasses(hasErrOrWarn, target, className) {
		var $t = $(target);

		if (hasErrOrWarn) {
			$t.removeClass('no_' + className);
			$t.addClass(className);
		} else {
			$t.addClass('no_' + className);
			$t.removeClass(className);
		}
	}