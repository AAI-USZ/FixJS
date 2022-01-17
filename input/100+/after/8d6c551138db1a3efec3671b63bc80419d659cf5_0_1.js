function startHWM() {
        startSocket();

        $sidebar = jQuery('<div>', {'id': 'sidebar'}).hide();
        $sb_ul = jQuery('<ul>', {'id': 'sidebar-ul'});
        $sb_out = jQuery('<div>', {'id': 'sidebar-out'});

        var $sb_in = jQuery('<div>', {'id': 'sidebar-in'}),
            $sb_ta = jQuery('<textarea>', {'placeholder': 'Type here to chat while you watch! Hit <enter> to send.', 'css': {'border': '0 none', 'border-top': '1px solid #ccc'}}),
            $sb_who = jQuery('<a>', {'href': '#', 'id': 'chat-who', 'text': 'You are ', 'title': 'Edit name'}),
            $sb_name = jQuery('<strong>', {'id': 'chat-name', 'text': user['name']});

        var $ch = jQuery('<div>', {'id': 'chat-head'}),
            $ch_strong = jQuery('<strong>', {'text': 'hulu'})
            $ch_rest = jQuery('<span>', {'text': 'withme'});

        jQuery('body').prepend($sidebar);
        $sidebar.append($sb_in);
        $sb_in.append($sb_out);
        $sb_out.append($sb_ul);
        $sidebar.append($sb_ta);

        $ch.append($ch_strong).append($ch_rest);
        $sidebar.append($ch);
        $sidebar.append($sb_who);
        $sb_who.append($sb_name);

        $sb_who.click(changeName);

        /* This probably fixes the problem where flash is swallowing clicks */
        var $fake_input = jQuery('<input>', {'class':'fake-input'}).appendTo('body');
        $sb_ta.click(function() {
            $sb_ta.blur();
            $fake_input.focus();
            $sb_ta.focus();
            $fake_input.val("");
        });

        $sb_ta.keydown(function(e) {
            if(e.keyCode == 13) {
                if(is_anon) {
                    changeName();
                }

                if(jQuery(this).val() == "ad") cl('Is ad? ' + ad_status);

                socket.emit('chat', {'room': hwm_hash, 'msg': jQuery(this).val(), 'who': user});
                jQuery(this).val("");

                return false;
            }
        });


        var $li = jQuery('<li>', {'text': 'Huluwithme is still in early beta. Please report absolutely any problems you find to gkoberger@gmail.com', 'class': 'beta'});
        $sb_ul.append($li);
    }