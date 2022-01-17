function (event) {
        if (confirm('The operation will erases the access token of this profile.\n Are you sure you want to continue?!\n')) 
        {
            conf.clean_token(conf.current_name);
            $('#profile_avatar_list a.selected').click();
        }
    }