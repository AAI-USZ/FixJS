function(msg_id, options) {
        var $li = $('#' + msg_prefix + msg_id);
        var lock_unique = want_unique_locks;
        var callback = null;
        if (options) {
            if (typeof(options['callback']) == 'function') {
                callback = options['callback'];
            }
            if (typeof(options['lock_unique']) != undefined && options['lock_unique'] != undefined) {
                lock_unique = options['lock_unique'];
            }
        }
        $li.addClass('msg-is-busy');
        $.ajax({
            dataType:"json", 
            type:"post", 
            url: url_root +"messages/" +
                (lock_unique? "lock_unique" : "lock") + 
                "/" + msg_id + ".json",
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', getCurrentAuthCredentials());
                xhr.withCredentials = true;
            },
            success:function(data, textStatus) { 
                if (data['success']) {
                    if (lock_unique) {
                        $('.msg-is-owned', $message_list_element).removeClass('msg-is-owned')
                    }
                    $li.removeClass('msg-is-busy msg-is-locked').addClass('msg-is-owned');
                    say_status("Lock granted OK"); // to data['data']['Lockkeeper']['username']?
                } else {
                    $li.removeClass('msg-is-busy').addClass('msg-is-locked');
                    say_status("failed: " + data['error']);
                }
                if (typeof(callback) == "function") { // note callbacks must check data['success']
                    callback.call($(this), data); // returned data['data'] is 'Message', 'Source', 'Lockkeeper' for success
                }
            }, 
            error: function(jqXHR, textStatus, errorThrown) {
                $li.removeClass('msg-is-busy');
                say_status("error: " + textStatus + ": " + errorThrown);
            }
        });
    }