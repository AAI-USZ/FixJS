function(key)
        {
            var data = $.jStorage.get(key);
            if(key != 'pairing_key' && data.name && data.config)
            {
                html += pinned_template(data);
            }
        }