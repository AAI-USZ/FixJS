function save_ad_positions() {

  ad_number = 1;

  all_ad_positions = new Array();

  $('.a4c_ad').each(function(){

	ad_position = {"top": $(this).css('top'), "right": $(this).css('right'), "bottom": $(this).css('bottom'), "left": $(this).css('left')};

    all_ad_positions.push(ad_position);

	ad_number++;

  });

  chrome.extension.sendRequest({action: "save_ad_positions", "positions": all_ad_positions, "url": url });

}