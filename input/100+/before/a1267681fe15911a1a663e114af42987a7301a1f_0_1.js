function (x,y) {
                var err, errortextbox, errorlinkbox;
                if (y.toLowerCase() === 'error') {
                    err = x.responseText.split('<title>')[1].split('</title>')[0] + ' <a class="monospace">-></a> ' + this.url + '.';
                    $('#node-error .error-text').html(err);
                    $('#node-error .error-link').html('View in Logs &raquo;');
                    $('#node-error').show();
                }
                enable_adding((y.toLowerCase() === 'success') ? true : false);
            }