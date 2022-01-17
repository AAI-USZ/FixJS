function(){
                  if(jQuery.cookie('searchPanelState') == 'expanded') {
                                          jQuery.cookie('searchPanelState', 'collapsed');
                                          button.text('Open Search Center');
                  } else {
                                          jQuery.cookie('searchPanelState', 'expanded');
                                          button.text('Close Search Center');
                  }
                  panel.slideToggle('slow');
                  return false;
	}