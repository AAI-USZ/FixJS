function(data, textStatus) {
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
            }