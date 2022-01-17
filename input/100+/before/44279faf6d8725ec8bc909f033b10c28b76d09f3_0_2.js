function(req, res) {
  console.log("about to upload...");
  console.log("upload: " + req.user);
  return fs.readFile(req.files.displayImage.path, function(err, data) {
    return Image.create(data, req.user, function(err, img) {
      return res.redirect('back');
    });
  });
}