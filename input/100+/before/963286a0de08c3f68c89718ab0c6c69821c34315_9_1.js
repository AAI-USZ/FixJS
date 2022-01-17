function changeTab(target,path) {
    
    kill_reg_timeouts();

  
  if ($("#loader").is(':hidden')) {
    // if previous extension was loaded save visibility of lists
    lists_visibility[$('#fliptabs li.act').attr('id')] = $('body>.lists').is(':visible');
  }
    
	$('#fliptabs li').removeClass('act');
	$('#fliptabs li').addClass('norm');
	
	tab='#exttab_'+target;
	$(tab).removeClass('norm');
	$(tab).addClass('act');
	
	$('.ext').css('display','none');
	
	div='#extdiv_'+target;
	$(div).css('display','block');

    // we don't want to load the tab content every time the tab is changed ...
    is_extension_loaded = $(div).html();    
	if (!is_extension_loaded) {
	    $("#loader").show();
      lists_visible(false);
    	path = '../extensions/' + path.replace('../extensions/','') ;
    	$(div).load(path);
	} else {
	    $("#loader").hide();
      // restore visibility of lists
      lists_visible(lists_visibility[$('#fliptabs li.act').attr('id')]);
      lists_write_annotations();
	}
        if (usr_ID) {
	  $.cookie('ki_active_tab_target_'+usr_ID, target);
	  $.cookie('ki_active_tab_path_'+usr_ID, path);
	}
}