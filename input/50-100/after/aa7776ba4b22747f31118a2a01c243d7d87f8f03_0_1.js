function addSlide() {

	$('.add-remove-slide-slider .slider').append("<div class = 'item item1'>new</div>");
	$('.add-remove-slide-slider').iosSlider('update');

}