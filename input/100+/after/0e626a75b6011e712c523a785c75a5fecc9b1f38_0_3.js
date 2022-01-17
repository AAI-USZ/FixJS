function slide(itemNumber){
	var thisItem 					 = item[itemNumber],
			pairedItem				 = item[thisItem.animations[2]],
			originalLeft		   = (thisItem.animations[1]=='left-right') ? -thisItem.adjustedWidth : windowWidth,
			currentTime 			 = scrollPercent;
			endTime1					 = thisItem.pause,
			endTime2					 = thisItem.endTime,
			startTime1				 = thisItem.startTime,
			startTime2				 = thisItem.resume,
			totalTime1  			 = endTime1 - startTime1,
			totalTime2				 = endTime2 - startTime2,
			progress1    			 = (currentTime - startTime1)/totalTime1,
			progress2    			 = (currentTime - startTime2)/totalTime2,
			leftMax1					 = (thisItem.animations[1]=='left-right') ? pairedItem.selector.offset().left + pairedItem.adjustedWidth + thisItem.adjustedWidth : originalLeft - windowWidth*0.25;
			leftMax2					 = (thisItem.animations[1]=='left-right') ? windowWidth + thisItem.adjustedWidth : thisItem.adjustedWidth + windowWidth*0.25;
	
	if (progress1 > 0.96 && progress2 < 0) {
		thisItem.selector.find('.blur').hide().removeClass('show');
		thisItem.selector.find('.text').show().addClass('show');
		thisItem.count = 1;
	} else {
		thisItem.selector.find('.blur').show().addClass('show');
		thisItem.selector.find('.text').hide().removeClass('show');
		thisItem.count = 0;
	} 
	
	console.log(progress2);
	
	if (progress1 < 1){
		console.log('leftMax1: '+leftMax1);
		thisItem.currentLeft   = (thisItem.animations[1]=='left-right') ? (leftMax1 * progress1)+originalLeft : originalLeft - (leftMax1 * progress1);
		thisItem.newLeft			 = thisItem.currentLeft
		thisItem.selector.css({'left':thisItem.currentLeft});
	} else if (progress2 > 0 && progress2 < 1) {
		thisItem.currentLeft   = (thisItem.animations[1]=='left-right') ? (leftMax2 * progress2)+thisItem.newLeft : thisItem.newLeft - (leftMax2 * progress2);
		thisItem.selector.css({'left':thisItem.currentLeft});
		thisItem.count = 0;
	}
}