function unsetViewerMode(mode){

	$('.' + mode)

		.removeClass(mode)

			// animation...

			.one("webkitTransitionEnd oTransitionEnd msTransitionEnd transitionend", function(){

				$('.current.image').click()

				return true

			});

}