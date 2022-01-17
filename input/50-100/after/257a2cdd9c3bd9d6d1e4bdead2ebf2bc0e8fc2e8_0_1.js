function Load_Cookie()  {
			
	// the div that will be hidden/shown
	//var panel = jQuery('#search_box');
	//var button = jQuery('#search_button');
    
	if(jQuery.cookie('searchPanelState') == undefined) {
		jQuery.cookie('searchPanelState', 'expanded');
	}
	//var state = jQuery.cookie('searchPanelState');
      
	if(jQuery.cookie('searchPanelState') == 'collapsed') {
		jQuery('#search_box').hide();
		jQuery('#search_button').text('Open Search Center');
	} else {
		jQuery('#search_button').text('Close Search Center');
      }
      /*
	button.click(function(){
                  if(jQuery.cookie('searchPanelState') == 'expanded') {
                                          jQuery.cookie('searchPanelState', 'collapsed');
                                          button.text('Open Search Center');
                  } else {
                                          jQuery.cookie('searchPanelState', 'expanded');
                                          button.text('Close Search Center');
                  }
                  panel.slideToggle('slow');
                  return false;
	}); */
}