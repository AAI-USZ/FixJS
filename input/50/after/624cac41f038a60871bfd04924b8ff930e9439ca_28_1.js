function(success, collection) {
                    if (success) {
                        $(document).trigger('done.newaddcontent.sakai', [[collection], 'user']);
                    }
                }