function() {
	
	$('.default-slider').iosSlider({
		desktopClickDrag: true,
		navNextSelector: $('.default-slider .next'),
		navPrevSelector: $('.default-slider .prev')
	});
	
	$('.default-slider-container .goToBlock .go').each(function(i) {
		$(this).bind('click', function() {
			$('.default-slider').iosSlider('goToSlide', i + 1);
		});
	});
	
	$('.snap-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true
	});
	
	$('.infinite-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true
	});
	
	$('.responsive-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true,
		responsiveSlideContainer: false
	});
	
	$('.responsive-slider-2').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true,
		responsiveSlides: false
	});
	
	$('.autoslide-slider1').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		autoSlide: true,
		startAtSlide: '2',
		scrollbar: true
	});
	
	$('.autoslide-slider2').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true,
		autoSlide: true,
		startAtSlide: '2',
		scrollbar: true,
		navNextSelector: $('.autoslide-slider2 .next'),
		navPrevSelector: $('.autoslide-slider2 .prev')
	});
	
	$('.autoslide-slider2-container .goToBlock .go').each(function(i) {
		$(this).bind('click', function() {
			$('.autoslide-slider2').iosSlider('goToSlide', i + 1);
		});
	});
	
	$('.variable-width-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true
	});
	
	$('.short-width-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true
	});
	
	$('.short-width-slider-2').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true,
		navNextSelector: '.short-width-slider-2 .next',
		navPrevSelector: '.short-width-slider-2 .prev'
	});
	
	$('.short-width-slider-3').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true
	});
	
	$('.autoslide-slider3').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true,
		autoSlide: true,
		autoSlideTransTimer: 0,
		navNextSelector: $('.autoslide-slider3 .next'),
		navPrevSelector: $('.autoslide-slider3 .prev')
	});
	
	$('.destroy-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true,
		autoSlide: true,
		navNextSelector: $('.destroy-slider .next'),
		navPrevSelector: $('.destroy-slider .prev')
	});
	
	$('.destroy-slider-container .goToBlock .go').each(function(i) {
		$(this).bind('click', function() {
			$('.destroy-slider').iosSlider('goToSlide', i + 1);
		});
	});
	
	$('.destroy-slider-container .destInitBlock .dest').each(function(i) {
	
		$(this).bind('click', function() {
			$('.destroy-slider').iosSlider('destroy');
		});
	
	});
	
	$('.destroy-slider-container .destInitBlock .init').each(function(i) {
	
		$(this).bind('click', function() {
			$('.destroy-slider').iosSlider({
				desktopClickDrag: true,
				snapToChildren: true,
				infiniteSlider: true,
				autoSlide: true,
				navNextSelector: $('.destroy-slider .next'),
				navPrevSelector: $('.destroy-slider .prev')
			});
		});
	
	});
	
	$('.callback-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true,
		navSlideSelector: $('.callback-slider .paging .box'),
		onSliderLoaded: callbackSliderLoadedChanged,
		onSlideChange: callbackSliderLoadedChanged,
		onSlideComplete: callbackSliderComplete,
		onSlideStart: callbackSliderStart
	});
	
	$('.callback-slider-container .goToBlock .go').each(function(i) {
		$(this).bind('click', function() {
			$('.callback-slider').iosSlider('goToSlide', i + 1);
		});
	});
	
	$('.full-width-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true
	});
	
	$('.form-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true
	});
	
	$('.media-query-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true
	});
	
	$('.thirty-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true
	});
	
	$('.undefined-height-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true
	});
	
	$('.bind-event-slider .linkBlock').bind('click', function() {
		window.open('http://google.ca');
	});
	
	$('.bind-event-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true
	});
	
	$('.image-drag-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		infiniteSlider: true
	});
	
	$('.add-remove-slide-slider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		scrollbar: true,
		scrollbarHide: false
	});
	
	$('.add-remove-slide-slider-container .destInitBlock .add').bind('click', function() {
		
		var slide = $("<div/>", {
			'class': 'item item1',
			'id': 'item1'
		});
		
		$('.add-remove-slide-slider').iosSlider('addSlide', slide, 2);
	
	});
	
	$('.add-remove-slide-slider-container .destInitBlock .rem').bind('click', function() {
	
		$('.add-remove-slide-slider').iosSlider('removeSlide', 2);
	
	});
	
}