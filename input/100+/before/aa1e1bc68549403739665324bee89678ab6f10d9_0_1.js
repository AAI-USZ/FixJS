function() {
    var data, onPhotoDataFail, onPhotoDataSuccess, onPhotoUploadFail, onPhotoUploadSuccess, page, views;
    data = this.fimo.data;
    views = this.fimo.views;
    page = this.fimo.page;
    onPhotoDataFail = function() {
      return alert("could not get photo data");
    };
    onPhotoUploadFail = function(error) {
      return alert("got error code on photo upload " + error.code);
    };
    onPhotoDataSuccess = function(imageURI) {
      var ft, options;
      alert("got photo data");
      options = new FileUploadOptions();
      options.fileKey = "displayImage";
      options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";
      ft = new FileTransfer;
      return ft.upload(imageURI, this.fimo.hostname + "/upload", onPhotoUploadSuccess, onPhotoUploadFail, options);
    };
    onPhotoUploadSuccess = function(res) {
      return alert("uploaded photo data");
    };
    return {
      wall: function() {
        return fimo.data.load("wall", function(content) {
          return page.create(views.wall({
            images: content.images
          }));
        });
      },
      image: function(id) {
        return fimo.data.load("image?id=" + id, function(content) {
          return page.create(views.image({
            imageUrl: content.url
          }));
        });
      },
      profile: function() {
        return fimo.data.load("profile", function(content) {
          return page.create(views.profile({
            username: content.username
          }));
        });
      },
      newObject: function() {
        return fimo.data.load("newObject", function(content) {
          return page.create(views.newObject({
            url: "" + this.fimo.hostname + "/createObject"
          }));
        });
      },
      add: function() {
        var destinationType, pictureSource;
        pictureSource = Camera.PictureSourceType['PHOTOLIBRARY'];
        destinationType = Camera.DestinationType.FILE_URI;
        return navigator.camera.getPicture(onPhotoDataSuccess, onPhotoDataFail, {
          quality: 50,
          allowEdit: true,
          destinationType: destinationType,
          sourceType: pictureSource
        });
      }
    };
  }