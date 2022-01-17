function(e) {
            if(e.keyCode == 13) {
                if(is_anon) {
                    changeName();
                }

                if(jQuery(this).val() == "ad") cl('Is ad? ' + ad_status);

                socket.emit('chat', {'room': hwm_hash, 'msg': jQuery(this).val(), 'who': user});
                jQuery(this).val("");

                return false;
            }
        }