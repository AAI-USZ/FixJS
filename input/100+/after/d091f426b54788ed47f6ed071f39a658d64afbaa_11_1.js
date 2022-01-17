function(){
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
        }