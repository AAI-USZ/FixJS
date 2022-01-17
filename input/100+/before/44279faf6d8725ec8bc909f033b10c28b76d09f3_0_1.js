function(err, data) {
    return Image.create(data, req.user, function(err, img) {
      return res.redirect('back');
    });
  }