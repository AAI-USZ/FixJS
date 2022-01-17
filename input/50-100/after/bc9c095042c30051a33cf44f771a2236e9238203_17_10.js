function(e) {
                if (e.which == $.ui.keyCode.LEFT) {
                    if ($('#topnavigation_search_input').length) {
                        // focus on search input
                        $('#topnavigation_search_input').focus();
                    }
                } else if (e.which == $.ui.keyCode.RIGHT) {
                    if ($('#topnavigation_user_options_name').length) {
                        // focus on user options menu
                        $('#topnavigation_user_options_name').focus();
                    }
                }
            }