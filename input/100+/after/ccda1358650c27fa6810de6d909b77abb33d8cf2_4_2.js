function() {
    return {
      template: _.template("<p>What's the first thing you want to post in your jumble?</p>\n<form id=\"jumbleObjectForm\">\n  <label>Take a picture</label>\n  <img src=\"\" id=\"previewImage\" style=\"display:none;\"/><br/>\n  <a href=\"\" id=\"imageLink\">Take an image</a><br/>\n  <label>Why do you want to post this?</label>\n  <br/>\n  <select name=\"verbs\" multiple size=\"6\" id=\"verbs\">\n  	<option selected=\"true\">Give</option>\n  	<option>Swap</option>\n  	<option>Sell</option>\n  	<option>Like</option>\n  	<option>Want</option>\n  </select>\n  <br/>\n  <label>What is it? (optional)</label>\n  <br/>\n  <input type=\"text\" class=\"span3\" name=\"tags\" placeholder=\"Add #tag\" id=\"tags\" />\n  <br/>\n  <button type=\"submit\" class=\"btn\">next step</button>\n</form>"),
      onPhotoUploadFail: function(error) {
        return alert("got an upload error: " + error.code);
      },
      onPhotoUploadSuccess: function(res) {
        var jsonResponse;
        jsonResponse = JSON.parse(unescape(res.response));
        $('#previewImage').attr("src", function() {
          return jsonResponse.imageUrl;
        });
        $('#previewImage').show();
        this.instanceArguments['jumbleObjectImageUrl'] = jsonResponse.imageUrl;
        return this.instanceArguments['jumbleObjectImageId'] = jsonResponse.imageId;
      },
      onPhotoDataSuccess: function(imageURI) {
        var ft, options;
        options = new FileUploadOptions();
        options.fileKey = "displayImage";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        ft = new FileTransfer();
        ft.upload(imageURI, "" + fimo.hostname + "/upload", _.bind(this.onPhotoUploadSuccess, this), _.bind(this.onPhotoUploadFail, this), options);
        return void 0;
      },
      onPhotoDataFail: function() {
        alert("failed");
        return false;
      },
      loaded: function() {
        var extendInstanceArguments,
          _this = this;
        extendInstanceArguments = function() {
          return _this.instanceArguments = _.extend(_this.instanceArguments, {
            jumbleObjectVerbs: $('#verbs').val(),
            jumbleObjectTags: $('#tags').val()
          });
        };
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
          extendInstanceArguments();
          fimo.page.create(fimo.views.jumblePeople(_this.instanceArguments));
          return false;
        });
        return $('#back').click(function() {
          extendInstanceArguments();
          fimo.controller['newJumble'](_this.instanceArguments);
          return false;
        });
      },
      destroy: function() {
        return console.log("destroyed jumbles#object}");
      }
    }  });
