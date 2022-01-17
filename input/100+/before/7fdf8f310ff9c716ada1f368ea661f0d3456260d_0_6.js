function(msg_id, fms_id, options) {
        if (options) {
            if (typeof(options['callback']) == 'function') {
                callback = options['callback'];
            }
        }
        var $li = $('#' + msg_prefix + msg_id);
        if ($li.size() == 0) {
            say_status("Couldn't find message with ID " + msg_id);
            return;
        }
        if (isNaN(parseInt(fms_id,0))) {
            say_status("missing FMS id");
            return;            
        }
        $li.addClass('msg-is-busy');
        $.ajax({
            dataType:"json", 
            type:"post", 
            data:$("#assign-fms-submit").closest("form").serialize(),
            url: url_root +"messages/assign_fms_id/" + msg_id + ".json",
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', getCurrentAuthCredentials());
                xhr.withCredentials = true;
            },
            success:function(data, textStatus) {
                if (data['success']) {
                    $li.removeClass('msg-is-busy msg-is-locked').addClass('msg-is-owned').fadeOut('slow'); // no longer available
                    say_status("FMS ID assigned"); // to data['data']['Lockkeeper']['username']?
                    if (typeof(callback) == "function") {
                        callback.call($(this), data['data']); // returned data['data'] is 'Message', 'Source', 'Lockkeeper' for success
                    }
                } else {
                    $li.removeClass('msg-is-busy').addClass('msg-is-locked');
                    say_status("failed: " + data['error']);
                }
            }, 
            error: function(jqXHR, textStatus, errorThrown) {
                say_status("error: " + textStatus + ": " + errorThrown);
                $li.removeClass('msg-is-busy');
            }
        });
    }