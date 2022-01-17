function(e) {
        var t = e.target;
        t.className = 'to-be-undraggable';
        t.removeAttribute('contentEditable');
        if( that.model.set('name', t.innerHTML) ) {
          that.model.save();
          // Let the uploader know that files should be uploaded to new folder
          that.uploader.uploader.settings.multipart_params.tag = that.model.get('name');
        }
      }