function(objectId) {
		var jQueryObject = TYPO3.jQuery('#' + objectId + '_div');
		if (jQueryObject.hasClass(this.classCollapsed)) {
			jQueryObject.removeClass(this.classCollapsed).addClass(this.classVisible);
			jQueryObject.find('#' + objectId + '_header .t3-icon-irre-collapsed').removeClass('t3-icon-irre-collapsed').addClass('t3-icon-irre-expanded');
		} else {
			jQueryObject.removeClass(this.classVisible).addClass(this.classCollapsed);
			jQueryObject.find('#' + objectId + '_header .t3-icon-irre-expanded').addClass('t3-icon-irre-collapsed').removeClass('t3-icon-irre-expanded');
		}
	}