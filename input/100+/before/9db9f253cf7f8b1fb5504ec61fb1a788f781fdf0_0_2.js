function checkArrowVisibility() {
	
	if ($(".playList ul li").length > 3) {
		
		$(".playlistDown").removeClass('inactive');
	}
	else {
		
		$(".playlistDown").addClass('inactive');
		$(".playlistUp").addClass('inactive');

	}
}