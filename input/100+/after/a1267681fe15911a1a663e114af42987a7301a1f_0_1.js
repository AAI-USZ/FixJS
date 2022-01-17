function perform_node_action(action) {
        var csrf_token = $('meta[name=csrf_token]').attr('content');

        $.ajax({
            url: action,
            type: 'POST',
            data: "csrf_token=" + encodeURIComponent(csrf_token),
            dataType: 'application/json',
            complete: function (x,y) {
                var err, errortextbox, errorlinkbox;
                if (y.toLowerCase() === 'error') {
                    // TODO: This wasn't returning anything meaningful,
                    // so I'm hardcoding a string until we can get
                    // actual useful messages in.
                    err = "An error occurred";
                    $('#node-error .error-text').html(err);
                    $('#node-error .error-link').html('View in Logs &raquo;');
                    $('#node-error').show();
                }
                enable_adding((y.toLowerCase() === 'success') ? true : false);
            },
            success: function(res) {
                if (res.result.toLowerCase() === 'ok') {
                    $('#node-to-add').val('');
                }
            }
        });
    }