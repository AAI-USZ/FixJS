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
    }