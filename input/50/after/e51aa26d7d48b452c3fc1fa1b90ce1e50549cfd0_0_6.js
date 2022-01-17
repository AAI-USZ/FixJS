function(xhr, status, message) {
                $(document).trigger('error', {
                    tiddler: tiddler,
                    method: 'put',
                    'status': status,
                    msg: message + '\n' + xhr.responseText});
            }