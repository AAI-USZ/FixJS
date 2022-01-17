function perform_node_action(action) {
        var csrf_token = $('meta[name=csrf_token]').attr('content');

        $.ajax({
            url: action,
            type: 'POST',
            data: "csrf_token=" + csrf_token,
            complete: function (x,y) {
                var err, errortextbox, errorlinkbox;
                if (y.toLowerCase() === 'error') {
                    err = x.responseText.split('<title>')[1].split('</title>')[0] + ' <a class="monospace">-></a> ' + this.url + '.';
                    $('#node-error .error-text').html(err);
                    $('#node-error .error-link').html('View in Logs &raquo;')
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