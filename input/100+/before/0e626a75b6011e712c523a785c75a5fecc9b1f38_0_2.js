function(){
		scrollPosition = $(this).scrollTop(),
		scrollAdjusted = scrollPosition*scrollScale,
		scrollPercent	 = (scrollPosition / scrollMax) * 100,
		scrollAmount   = scrollPosition - scrollOld,
		scrollOld			 = scrollPosition;
		scrollAnimation();
	}