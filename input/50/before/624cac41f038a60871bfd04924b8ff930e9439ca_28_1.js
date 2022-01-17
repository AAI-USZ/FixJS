function(success, collection) {
                    if (success) {
                        $(window).trigger('done.newaddcontent.sakai', [[collection], 'user']);
                    }
                }