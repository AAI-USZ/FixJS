function(imageURI) {
      var ft, options;
      alert("got photo data");
      options = new FileUploadOptions();
      options.fileKey = "displayImage";
      options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";
      ft = new FileTransfer;
      return ft.upload(imageURI, this.fimo.hostname + "/upload", onPhotoUploadSuccess, onPhotoUploadFail, options);
    }