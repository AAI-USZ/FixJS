function(data){
           data = data[0];
           newResource.set({
             url: urlVal,
             resource_type: 'file',
             format: data.format,
             size: data.size,
             mimetype: data.mimetype,
             last_modified: data.last_modified,
             webstore_url: 'enabled',
             url_error: (data.url_errors || [""])[0]
           });
           self.collection.add(newResource);
           self.resetForm();
         }