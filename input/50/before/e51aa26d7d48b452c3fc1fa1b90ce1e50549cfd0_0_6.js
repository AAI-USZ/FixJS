function(xhr, status, message) {
                $('body').trigger('error', 'failed to delete ' + tiddler.title
                    + ': ' + message + ' ' + xhr.responseText);
            }