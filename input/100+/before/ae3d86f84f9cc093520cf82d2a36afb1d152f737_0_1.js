function () {
	$.fn.cycle.haveCheckedCSS3Support = true;
	var addSupportFor = [ 'userSelect', 'userModify', 'userDrag', 'tapHighlightColor' ];
	var extraSupport = [ 'transitionDuration', 'transitionDelay', 'transform', 'transformOrigin', 'transformStyle','transitionProperty', 'perspective', 'backfaceVisibility' ];

	var checkSupportForCSS3d = !!navigator.userAgent.match(/ipod|ipad|iphone/gi);

	if ( checkSupportForCSS3d ) {
		var totalsup = addSupportFor.join('|') + '|' + extraSupport.join('|');
		addSupportFor = totalsup.split('|');
	}
	$( addSupportFor ).each( checkStyleSupport );
}