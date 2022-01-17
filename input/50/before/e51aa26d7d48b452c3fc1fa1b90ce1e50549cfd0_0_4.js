function(xhr, status, message) {
                $('body').trigger('error', 'failed to put ' + tiddler.title
                    + ': ' + message + ' ' + xhr.responseText);
            }