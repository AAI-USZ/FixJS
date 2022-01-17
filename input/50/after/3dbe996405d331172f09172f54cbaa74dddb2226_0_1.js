function handleResponse(ok) {
            // close dialog
            win.dialog('close');
            // if response was 'Ok' then invoke the callback
            if (ok && callback) {
                callback(userInput.val());
            }
            // remove from DOM
            win.remove();
        }