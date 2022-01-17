function() {
	$( "#popupPhotoPortrait, #popupPhotoLandscape" ).on({
		popupbeforeopen: function( event ) {
			var inner = $( window ).height() - 62 + "px";
			$( ".ui-popup > img" ).css( "height", inner );
		}
	});
}