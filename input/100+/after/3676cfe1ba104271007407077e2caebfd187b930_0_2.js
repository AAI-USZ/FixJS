function(data) {
        var name = data._label;
        if (name && name.length > 0 && name[0] === '/') {
          name = name.slice(1);
        }
        var d = new Date(data._last_modified);
        var lastmod = self.ISODateString(d);
        var newResource = new CKAN.Model.Resource({});
        newResource.set({
            url: data._location
            , name: name
            , size: data._content_length
            , last_modified: lastmod
            , format: data._format
            , mimetype: data._format
            , resource_type: 'file.upload'
            , owner: data['uploaded-by']
            , hash: data._checksum
            , cache_url: data._location
            , cache_url_updated: lastmod
          }
          , {
            error: function(model, error) {
              var msg = 'Filed uploaded OK but error adding resource: ' + error + '.';
              msg += 'You may need to create a resource directly. Uploaded file at: ' + data._location;
              self.setMessage(msg, 'error');
            }
          }
        );
        self.collection.add(newResource);
        self.setMessage('File uploaded OK and resource added', 'success');
      }