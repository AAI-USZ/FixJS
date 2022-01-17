function() {
          console.log("creating object...");
          fimo.data.post('objects/create', {
            imageId: _this.instanceArguments['imageId'],
            verbs: $('#verbs').val(),
            tags: $('#tags').val()
          }, function() {
            return fimo.controller.jumbles();
          }, function() {
            return $('.alert-error').show();
          });
          return false;
        }