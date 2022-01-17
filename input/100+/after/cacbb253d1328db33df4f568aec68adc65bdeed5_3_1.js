function() {
        templater.render({
            'id': 'http://example.test/',
            'title': 'test',
            'datasets': [{
                'author': {'name': 'fred'},
                'files': [{
                  'href': 'general/a.tif',
                  'title': 'a.tif',
                  'type': 'image/tiff',
                  'sha512': 'deadbeefdeadbeefdeadbeefdeadbeef'
                           +'deadbeefdeadbeefdeadbeefdeadbeef'
                           +'deadbeefdeadbeefdeadbeefdeadbeef'
                           +'deadbeefdeadbeefdeadbeefdeadbeef'
                }, {
                  'href': 'general/a.txt',
                  'title': 'a.txt',
                  'type': 'text/plain',
                  'sha512': 'beeffeedbeeffeedbeeffeedbeeffeed'
                           +'beeffeedbeeffeedbeeffeedbeeffeed'
                           +'beeffeedbeeffeedbeeffeedbeeffeed'
                           +'beeffeedbeeffeedbeeffeedbeeffeed'
                }],
                'updated': new Date(1970, 00, 03)
            }]
        }, this.callback);
      }