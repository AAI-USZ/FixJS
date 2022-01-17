function(data, textStatus) { 
                if (data.success) {
                    if (lock_unique) {
                        $('.msg-is-owned', $message_list_element).removeClass('msg-is-owned');
                    }
                    $li.removeClass('msg-is-busy msg-is-locked').addClass('msg-is-owned');
                    say_status("Lock granted OK"); // to data['data']['Lockkeeper']['username']?
                } else {
                    $li.removeClass('msg-is-busy').addClass('msg-is-locked');
                    say_status("failed: " + data.error);
                }
                if (typeof(callback) === "function") { // note callbacks must check data['success']
                    callback.call($(this), data); // returned data['data'] is 'Message', 'Source', 'Lockkeeper' for success
                }
            }