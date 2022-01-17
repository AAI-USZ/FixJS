function (event) {
        if (confirm('The operation will erase the access token of this profile.\n Are you sure you want to continue?!\n')) 
        {
            conf.clear_token(conf.current_name);
            $('#profile_avatar_list a.selected').click();
        }
    }