function(data) {
            // redirect and reload page
            var callback = null;
            if (data.reload != undefined) {
                callback = function() {
                    // reload current page
                    window.location.reload();
                }
            } else if (data.redirect != undefined) {
                callback = function() {
                    // redirect to another page
                    window.location = data.redirect;
                }
            }

            // show messages and run callback after
            if (data._messages != undefined) {
                Messages.setCallback(callback);
                Messages.addMessages(data._messages);
            } else {
                callback();
            }

            if (data.callback != undefined && $.isFunction(window[data.callback])) {
                window[data.callback](data);
            }
        }