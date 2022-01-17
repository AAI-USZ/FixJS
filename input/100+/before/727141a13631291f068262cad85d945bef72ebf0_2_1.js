function init () {
    ui.Welcome.id = '#welcome_page';
    ui.Welcome.me = $('#welcome_page');

    // bind events

    $('#tbox_basic_auth_password').blur(
    function (event) {
        var cur_profile = conf.get_current_profile();
        if ($(this).val().length == 0) {
            cur_profile.preferences.remember_password = false;
        } else {
            cur_profile.preferences.remember_password = true;
        }
    });

    $('#sign_in_block .service_chooser a').click(function () {
        $('#sign_in_block .service_chooser a').removeClass('selected');
        $(this).addClass('selected');
    });

    $('#tbox_new_profile_name').keydown(function (ev) {
        if (ev.keyCode == 13) {
            ui.Welcome.go.click();
        }
    }); 

    ui.Welcome.go = $('#sign_in_block .go');
    ui.Welcome.go.click(function () {
        if (ui.Welcome.selected_profile == 'default') {
            ui.Welcome.create_profile();
        } else {
            if (ui.Welcome.selected_profile.indexOf('@twitter') != -1){
                ui.Welcome.oauth_sign_in();
            } else { // identica
                ui.Welcome.basic_auth_sign_in();
            }
        }
    });
    
    $('#btn_welcome_prefs').click(
    function (event) {
        ui.PrefsDlg.load_settings(conf.settings);
        ui.PrefsDlg.load_prefs();
        globals.prefs_dialog.open();
    });
        
    $('#clean_token_btn').click(
    function (event) {
        if (confirm('The operation will erases the access token of this profile.\n Are you sure you want to continue?!\n')) 
        {
            conf.clean_token(conf.current_name);
            $('#profile_avatar_list a.selected').click();
        }
    });

    $('#btn_welcome_delete_profile').click(
    function (event) {
        if (confirm('The operation will erases all data of this profile.\n Are you sure you want to continue?!\n')) 
        {
            db.remove_profile(ui.Welcome.selected_profile, 
            function (result) {
                if (result) {
                    delete conf.profiles[conf.current_name];
                    ui.Welcome.load_profiles_info();
                    if ($('#profile_avatar_list a').length == 1) {
                        $('#profile_avatar_list a:first').click();
                    } else {
                        $('#profile_avatar_list a:eq(1)').click();
                    }
                }        
            });
        }
    });

    $('#btn_welcome_about').click(
    function (event) {
        globals.about_dialog.open();
    });

    $('#sel_welcome_lang').bind('change', function () {
        i18n.change($(this).val());
        if (conf.current_name.length != 0) {
            conf.get_current_profile().preferences['lang'] = $('#sel_welcome_lang').val();
            conf.save_prefs(conf.current_name);    
        }
    });
    return this;
}