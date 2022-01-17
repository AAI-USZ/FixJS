function() {
        templater.render({
            'id': 'http://example.test/',
            'title': 'test',
            'datasets': [{
                'author': {'name': 'fred'},
                'files': [{
                  'href': 'general/a.tif',
                  'title': 'a.tif',
                  'type': 'image/tiff'
                }, {
                  'href': 'general/a.txt',
                  'title': 'a.txt',
                  'type': 'text/plain'
                }],
                'updated': new Date(1970, 00, 03)
            }]
        }, this.callback);
      }