function(prompt, callback, baseId) {
        baseId = baseId || 'get-value';

        // if the user didn't specify a callback, just return
        if (typeof callback !== 'function') {
            return;
        }

        var promptId = baseId+'-prompt',
            inputId = baseId+'-input',
            okId = baseId+'-ok',
            cancelId = baseId + '-cancel',
            element = document.getElementById(baseId),
            win = null;
            userInput = null;

        function handleResponse(ok) {
            // close dialog
            win.dialog('close');
            // if response was 'Ok' then invoke the callback
            if (ok && callback) {
                callback(userInput.val());
            }
            //clear input value
            userInput.val('');
        }

        if (element === null) {
            // Build dialog
            win = jQuery('<div id="'+baseId+'"><div id="'+promptId+'" /></div>');

            userInput = jQuery('<input type="text" id="'+inputId+'" style="width:100%"></input>');
            userInput.bind('keypress.enterkey', function(e) {
                if (e.which === 13) {
                    handleResponse(true);
                }
            });
            userInput.appendTo(win);

            win.dialog({
                autoOpen: false,
                modal: true,
                buttons: [
                    {
                        text: 'Ok',
                        id: okId,
                        click: function() { handleResponse(true); }
                    },
                    {
                        text: 'Cancel',
                        id: cancelId,
                        click: function() { handleResponse(false); }
                    }
                ]
            });
        }
        else {
            win = jQuery('#'+baseId);
            userInput = jQuery('#'+inputId);
        }

        // Update for current invocation.
        jQuery('#'+promptId).html(prompt+':');

        win.dialog('open');
    }