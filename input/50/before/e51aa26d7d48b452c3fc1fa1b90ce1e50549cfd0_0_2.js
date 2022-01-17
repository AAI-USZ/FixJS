function(xhr, status, message) {
                $('body').trigger('error', 'failed to get ' + tiddler.title
                    + ': ' + message + ' ' + xhr.responseText);
            }