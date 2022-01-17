function callbackSliderLoadedChanged(args) {
	
	$(args.sliderObject).siblings('.paging').children('.box').removeClass('selected');
	$(args.sliderObject).siblings('.paging').children('.box:eq(' + args.currentSlideNumber + ')').addClass('selected');
	/* console.log(args); */
	
}