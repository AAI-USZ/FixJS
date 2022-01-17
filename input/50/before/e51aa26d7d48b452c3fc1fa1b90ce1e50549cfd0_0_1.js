function(data) {
                tiddler.fromJSON(data);
                $('body').trigger('tiddlerGet', tiddler);
            }