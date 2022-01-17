function(data, callback) {
    console.log('then find user');
    photo = data;
    return model.user.findOne({
      _id: photo._user
    }, callback);
  }