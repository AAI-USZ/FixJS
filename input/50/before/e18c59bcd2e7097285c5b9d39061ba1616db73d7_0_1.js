function(data, callback) {
    photo = data;
    return model.user.findOne({
      _id: photo._user
    }, callback);
  }