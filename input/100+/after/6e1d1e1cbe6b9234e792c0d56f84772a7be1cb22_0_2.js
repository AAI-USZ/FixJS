function(event) {
        try {
            event.preventDefault();
            var obj = $(this);

            // Show feedback while processing
            obj.addClass('busy');
            $('body').addClass('busy');

            // error handler
            obj.ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {
                // do not pile up error handlers upon repeat submissions
                $(this).off('ajaxError');
                // remove feedback elements
                obj.removeClass('busy');
                $('body').removeClass('busy');
                if (options.error) options.error(obj, event, jqXHR, ajaxSettings, thrownError);
                textpattern.Relay.callback('txpAsyncHref.error', {'this': obj, 'event': event, 'jqXHR': jqXHR, 'ajaxSettings': ajaxSettings, 'thrownError': thrownError});
            });

            sendAsyncEvent(
                // query string contains request params
                this.search.replace('?', '') + '&value=' + obj.text(),
                function(data, textStatus, jqXHR) {
                    obj.html(data);

                    // remove feedback elements
                    obj.removeClass('busy');
                    $('body').removeClass('busy');
                    if (options.success) options.success(obj, event, data, textStatus, jqXHR);
                    textpattern.Relay.callback('txpAsyncHref.success', {'this': obj, 'event': event, 'data': data, 'textStatus': textStatus, 'jqXHR': jqXHR});
                },
                'text'
            );
        } catch(e){}

    }