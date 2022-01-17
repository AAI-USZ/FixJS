function(){
        $('fieldset',section_graphics).hide();
        $('.vm_param',section_graphics).hide();
        $('select#TYPE',section_graphics).parent().show();

        $('#add_graphics',section_graphics).click(function(){
            $('fieldset',section_graphics).toggle();
            return false;
        });

        //Chrome workaround
        $('select#TYPE',section_graphics).change(function(){
            $(this).trigger("click");
        });
        $('select#TYPE',section_graphics).click(function(){
            g_type = $(this).val();
            switch (g_type) {
            case "vnc":
                $('#LISTEN',section_graphics).parent().show();
                $('#PORT',section_graphics).parent().show();
                $('#PASSWD',section_graphics).parent().show();
                $('#KEYMAP',section_graphics).parent().show();
                $('#PORT',section_graphics).parent().removeAttr('disabled');
                $('#PASSWD',section_graphics).parent().removeAttr('disabled');
                $('#KEYMAP',section_graphics).parent().removeAttr('disabled');
                break;
            case "sdl":
                $('#LISTEN',section_graphics).parent().show();
                $('#PORT',section_graphics).parent().hide();
                $('#PASSWD',section_graphics).parent().hide();
                $('#KEYMAP',section_graphics).parent().hide();
                $('#PORT',section_graphics).parent().attr('disabled','disabled');
                $('#PASSWD',section_graphics).parent().attr('disabled','disabled');
                $('#KEYMAP',section_graphics).parent().attr('disabled','disabled');
                break;
            default:
                $('#LISTEN',section_graphics).parent().hide();
                $('#PORT',section_graphics).parent().hide();
                $('#PASSWD',section_graphics).parent().hide();
                $('#KEYMAP',section_graphics).parent().hide();
            }
        });

    }