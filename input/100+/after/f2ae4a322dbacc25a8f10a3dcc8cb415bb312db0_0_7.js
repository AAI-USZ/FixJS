function(show){
            if( show ){
                $('#grid_loading_screen').height($('#grid_content_window').height()).show();
            } else {
                $('#grid_loading_screen').hide();
            }
        }