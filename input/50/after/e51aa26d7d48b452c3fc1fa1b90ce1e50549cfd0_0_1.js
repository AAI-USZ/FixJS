function(data) {
                tiddler.fromJSON(data);
                console.log('got', tiddler);
                $(document).trigger('tiddlerGet', tiddler);
            }