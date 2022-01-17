function(){
	ad_position = {"top": $(this).css('top'), "right": $(this).css('right'), "bottom": $(this).css('bottom'), "left": $(this).css('left')};
    all_ad_positions.push(ad_position);
	ad_number++;
  }