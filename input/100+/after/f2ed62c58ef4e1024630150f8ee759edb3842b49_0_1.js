function () {
      var photo = this;

      if (!photo.imageURL) {
        throw new Error("Cannot upload photo because it does not have an imageURL! You need to capture an image before uploading.");
      }

      console.log("Uploading photo: "+photo.imageURL);

      var options = new FileUploadOptions();
      options.fileKey = "photo[image]";
      options.fileName = photo.imageURL.substr(photo.imageURL.lastIndexOf('/')+1);
      options.mimeType = "image/jpeg";

      var success = function (res) {
        console.log("Image uploaded successfully; "+res.bytesSent+" bytes sent.");
        
        res.photo = JSON.parse(res.response);
        photo.set('id', res.photo.id);

        console.log("Assigned id to photo: "+photo.id);

        photo.set(res.photo);

        photo.trigger('image_upload', res);
      };

      var failure = function (error) {
        console.error("Image upload failed: " + JSON.stringify(error));
        photo.trigger('image_upload_error', error);
      };

      var transfer = new FileTransfer();
      transfer.upload(photo.imageURL, photo.url(), success, failure, options);
    }