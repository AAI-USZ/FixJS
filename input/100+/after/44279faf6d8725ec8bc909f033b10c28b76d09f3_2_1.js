function(uploadedImage, user, callback) {
  var img;
  img = new ImageModel({
    user: user.id
  });
  return fs.writeFile(img.tmpPath(), uploadedImage, function(err) {
    return img.crop("48x48", function() {
      return img.crop("100x100", function() {
        return img.save(function(err) {
          if (err) {
            return callback(err, img);
          } else {
            return img.uploadS3(function() {
              return callback(void 0, img);
            });
          }
        });
      });
    });
  });
}