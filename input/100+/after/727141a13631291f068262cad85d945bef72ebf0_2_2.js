function (event) {
        var profile_name = $(this).attr('href');
        ui.Welcome.selected_profile = profile_name;

        var type = 'default';
        if (profile_name != 'default') {
            type = profile_name.split('@')[1];
        }
        var width_per_page = {'default': 480, 'twitter': 360, 'identica': 460};
        $('#sign_in_block .inner').stop().animate({'width': width_per_page[type]}, 200);
        if (profile_name == 'default') {
            $('#btn_welcome_prefs, #btn_welcome_delete_profile, #btn_welcome_exts').hide();
            $('#sign_in_block .profile_title').text('New Profile');
            $('.service_tabs_page').hide();
            $("#service_page_new").show();
        } else {
            $('#clear_token_btn').css('visibility', 'visibility');
            $("#service_page_new").hide();
            $('#service_page_' + type).show();
            $('.service_tabs_page').not('#service_page_' + type).hide();
            $('#sign_in_block .profile_title').text(profile_name)
            $('#btn_welcome_prefs, #btn_welcome_delete_profile, #btn_welcome_exts').show();
            $('#tbox_basic_auth_username').val(
                conf.profiles[profile_name].preferences.default_username);
            $('#tbox_basic_auth_password').val(
                conf.profiles[profile_name].preferences.default_password);
            // apply preferences
            conf.apply_prefs(profile_name, true);
            if (globals.twitterClient.oauth.access_token == ''
                || globals.twitterClient.oauth.access_token.constructor != Object) {
                $('#access_token_status_hint').css('visibility', 'visible');
                $('#clear_token_btn').css('visibility', 'hidden');
            } else {
                $('#access_token_status_hint').css('visibility', 'hidden');
                $('#clear_token_btn').css('visibility', 'visibility');
            }
        }
        $('#profile_avatar_list a').not(this).removeClass('selected');
        $('#profile_avatar_list li.selected').removeClass('selected');
        $(this).addClass('selected');
        $(this).parent().addClass('selected');

        var offset = parseInt($(this).attr('idx')) * (74 + 7);
        $('#profile_avatar_list').stop().animate(
            {'margin-top': '-' + (offset + 165) + 'px'}, 300);
        return false;
    }