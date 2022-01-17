function(req, res, next){
    var message = new db.models.Message();
    message.message = req.params.message;
    message.X = req.params.X;
    message.Y = req.params.Y;
    message.Z = req.params.Z;
    message.save(function () {
      res.send(req.body);
    });
  }