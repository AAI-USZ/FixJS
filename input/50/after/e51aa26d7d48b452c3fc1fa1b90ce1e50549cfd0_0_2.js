function(xhr, status, message) {
                $(document).trigger('error', {
                    tiddler: tiddler,
                    method: 'get',
                    'status': status,
                    msg: message + '\n' + xhr.responseText});
            }