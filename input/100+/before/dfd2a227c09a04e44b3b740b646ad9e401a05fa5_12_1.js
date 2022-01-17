function(){
        var user_name=$('#username',this).val();
        var user_password=$('#pass',this).val();
        var driver = $('#driver', this).val();
        if (driver == 'custom')
            driver = $('input[name="custom_auth"]').val();

        if (!user_name.length || !user_password.length){
            notifyError(tr("User name and password must be filled in"));
            return false;
        };

        var user_json = { "user" :
                          { "name" : user_name,
                            "password" : user_password,
                            "auth_driver" : driver
                          }
                        };
        Sunstone.runAction("User.create",user_json);
        $create_user_dialog.dialog('close');
        return false;
    }