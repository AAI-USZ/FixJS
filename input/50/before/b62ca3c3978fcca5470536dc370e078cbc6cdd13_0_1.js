function(key)
        {
            if(key != 'pairing_key');
                html += pinned_template($.jStorage.get(key));
        }