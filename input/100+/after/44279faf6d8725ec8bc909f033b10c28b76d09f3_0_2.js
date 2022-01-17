function(req, res) {
  if (req.loggedIn === false) {
    return res.send({
      status: 403,
      message: "Not Logged in"
    }, 403);
  } else {
    return fs.readFile(req.files.displayImage.path, function(err, data) {
      if (err) {
        console.log(err);
        return res.send({
          status: 500,
          message: err
        }, 500);
      } else {
        return Image.create(data, req.user, function(err, img) {
          if (err) {
            console.log(err);
            return res.send({
              status: 500,
              message: err
            }, 500);
          } else {
            console.log(img);
            return res.send(JSON.stringify({
              status: 200,
              imageId: img._id,
              imageUrl: img.url("100x100")
            }));
          }
        });
      }
    });
  }
}