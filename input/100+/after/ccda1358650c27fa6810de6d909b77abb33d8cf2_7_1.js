function() {
          var tags;
          console.log("creating object...");
          tags = $('#tags').val().split(",");
          fimo.data.post('objects/create', {
            imageId: _this.instanceArguments['imageId'],
            verbs: $('#verbs').val(),
            tags: tags
          }, function() {
            return fimo.controller.jumbles();
          }, function() {
            return $('.alert-error').show();
          });
          return false;
        }