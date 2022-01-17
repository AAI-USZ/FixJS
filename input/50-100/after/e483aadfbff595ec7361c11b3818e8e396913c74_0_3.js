function( firstClassName, secondClassName ) {
	if (!$(this).hasClass(firstClassName)) {
	   $(this).addClass(firstClassName);
	   $(this).removeClass(secondClassName);
	} else {
		$(this).removeClass(firstClassName);
		$(this).addClass(secondClassName);
	}
}