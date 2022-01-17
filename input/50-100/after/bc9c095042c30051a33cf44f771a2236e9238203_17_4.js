function() {
            if (sakai.api.User.isAnonymous(sakai.data.me)) {
                $('#topnavigation_user_options_login_fields').addClass('topnavigation_force_submenu_display');
                $('#topnavigation_user_options_login_wrapper').addClass('topnavigation_force_submenu_display_title');
                $('#topnavigation_user_options_login_fields_username').focus();
            }
        }