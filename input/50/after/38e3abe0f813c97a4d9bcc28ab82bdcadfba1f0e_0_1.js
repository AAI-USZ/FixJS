function () {
	// Some fixes for IE8 and earlier
	//jQuery('.slides-2 .slide:nth-child(even)').addClass('slide-even');
	
	// Languages
	/*var languageSetting = 'en';
	var languageValue = $('html').eq(0).attr('lang');
	if (languageValue) {
		languageSetting = languageValue;
	}*/
	
	/*var slideCultures = {
		
		'en': {
						'pause': 'Pause'
						,'resume': 'Resume'
						,'previous': 'Previous'
						,'next': 'Next'
						,'numberedListIntro': 'Go to:'
			
					}
		,'es': {
						'pause': 'Pausar'
						,'resume': 'Continuar'
						,'previous': 'Anterior'
						,'next': 'Siguiente'
						,'numberedListIntro': 'Ir a:'
			
					}
		
	}*/
	


	// Slides!
	jQuery.fn.sliceSlide();

	// Slides!
	jQuery.fn.sliceSlide({
		slidesBox: '[data-slice-slide-box-twins]',
		templatesControls: '#slice-slide-controls-only-text',
		numberSimultaneousSlides: 2
	});
	
}