function setupCreateUserDialog(){
    dialogs_context.append('<div title=\"'+tr("Create user")+'\" id="create_user_dialog"></div>');
    $create_user_dialog = $('#create_user_dialog',dialogs_context);
    var dialog = $create_user_dialog;
    dialog.html(create_user_tmpl);

    //Prepare jquery dialog
    dialog.dialog({
        autoOpen: false,
        modal:true,
        width: 400
    });

    $('button',dialog).button();

    $('input[name="custom_auth"]',dialog).parent().hide();
    $('select#driver').change(function(){
        if ($(this).val() == "custom")
            $('input[name="custom_auth"]',dialog).parent().show();
        else
            $('input[name="custom_auth"]',dialog).parent().hide();
    });


    $('#create_user_form',dialog).submit(function(){
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
    });
}