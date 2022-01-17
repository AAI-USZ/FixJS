function(event) {
        try {
            event.preventDefault();
            var obj = $(this);

            // Show feedback while processing
            obj.addClass('busy');
            $('body').addClass('busy');

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
                options.dataType
            );
        } catch(e){}

    }