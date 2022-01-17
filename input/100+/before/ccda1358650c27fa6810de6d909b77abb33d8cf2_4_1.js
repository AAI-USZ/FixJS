function() {
        var _this = this;
        if (this.instanceArguments['jumbleObjectVerbs']) {
          $('#verbs').val(this.instanceArguments['jumbleObjectVerbs']);
        }
        if (this.instanceArguments['jumbleObjectTags']) {
          $('#tags').val(this.instanceArguments['jumbleObjectTags']);
        }
        if (this.instanceArguments['jumbleObjectImageUrl']) {
          $('#previewImage').attr('src', function() {
            return _this.instanceArguments['jumbleObjectImageUrl'];
          });
          $('#previewImage').show();
        }
        $('#imageLink').click(function() {
          if (fimo.device.getAgent() === "browser") {
            return _this.onPhotoUploadSuccess({
              "response": JSON.stringify({
                "imageUrl": "http://fimo.s3.amazonaws.com/images/4fff0a2e0df2a02233000007_100x100.jpg",
                imageId: "4fff0a2e0df2a02233000007"
              })
            });
          } else {
            fimo.device.ready(function() {
              navigator.camera.getPicture(_.bind(_this.onPhotoDataSuccess, _this), _.bind(_this.onPhotoDataFail, _this), {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                quality: 50
              });
              return false;
            });
            return false;
          }
        });
        $('#jumbleObjectForm').submit(function() {
          fimo.page.create(fimo.views.jumblePeople(_.extend(_this.instanceArguments, {
            jumbleObjectVerbs: $('#verbs').val(),
            jumbleObjectTags: $('#tags').val()
          })));
          return false;
        });
        return $('#back').click(function() {
          fimo.page.create(fimo.views.newJumble(_.extend(_this.instanceArguments, {
            jumbleObjectVerbs: $('#verbs').val(),
            jumbleObjectTags: $('#tags').val()
          })));
          return false;
        });
      }