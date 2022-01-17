function() {
  
    var preselected_knd = 0;

    if (usr_ID) {
      // automatic tab-change on reload
      ki_active_tab_target  = $.cookie('ki_active_tab_target_'+usr_ID);
      ki_active_tab_path    = $.cookie('ki_active_tab_path_'+usr_ID);
    }
    else {
      ki_active_tab_target  = null;
      ki_active_tab_path    = null;
    }
    if (ki_active_tab_target && ki_active_tab_path ) {
      changeTab(ki_active_tab_target,ki_active_tab_path);
    } else {
      changeTab(0,'ki_timesheets/init.php');
    }
    
    $("#main_tools_button").hoverIntent({
        sensitivity: 7, interval: 300, over: showTools, timeout: 6000, out: hideTools
    });

    $('#main_credits_button').click(function(){
        this.blur();
        floaterShow("floaters.php","credits",0,0,650,400);
    });
    
    $('#main_prefs_button').click(function(){
        this.blur();
        floaterShow("floaters.php","prefs",0,0,450,300);
    });

    
    $('#buzzer').click(function(){
      buzzer();
    });

    if (currentRecording > -1 || (selected_knd && selected_pct && selected_evt)) {
      $('#buzzer').removeClass('disabled');
    }
 
    n_uhr();
    
    if (currentRecording > -1) {
        show_stopwatch();
    } else {
        show_selectors();
    }

    var lists_resizeTimer = null;
    $(window).bind('resize', function() {

	resize_menu();

       if (lists_resizeTimer) clearTimeout(lists_resizeTimer);
       lists_resizeTimer = setTimeout(lists_resize, 500);
    });
    
    // Implement missing method for browsers like IE.
    // thanks to http://stellapower.net/content/javascript-support-and-arrayindexof-ie
    if (!Array.indexOf) {
      Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0); i < this.length; i++) {
          if (this[i] == obj) {
            return i;
          }
        }
        return -1;
      }
    }

}