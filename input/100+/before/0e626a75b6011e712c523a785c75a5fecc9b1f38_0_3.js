function slide(itemNumber){
	var thisItem 					 = item[itemNumber],
			pairedItem				 = item[thisItem.animations[2]],
			originalLeft		   = (thisItem.animations[1]=='left-right') ? -thisItem.adjustedWidth : windowWidth+thisItem.adjustedWidth,
			currentTime 			 = scrollPercent,
			totalTime  			 	 = thisItem.endTime - thisItem.startTime,
			progress    			 = (currentTime - thisItem.startTime)/totalTime,
			leftMax					   = (thisItem.animations[1]=='left-right') ? pairedItem.selector.offset().left + pairedItem.adjustedWidth + 200: windowWidth*0.25;
	if (progress > 0.96 && thisItem.count == 0 && scrollAmount > 0) {
		thisItem.selector.find('.blur').hide().removeClass('show');
		thisItem.selector.find('.text').show().addClass('show');
		thisItem.count = 1;
	} else if (progress < 0.96 && thisItem.count == 1 && scrollAmount < 0) {
		thisItem.selector.find('.blur').show().addClass('show');
		thisItem.selector.find('.text').hide().removeClass('show');
		thisItem.count = 0;
	}
	thisItem.currentLeft   = (leftMax * progress)+originalLeft;
	thisItem.selector.css({'left':thisItem.currentLeft});
}