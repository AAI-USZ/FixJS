function(req, res, next){
    var message = new db.models.Message();
    console.log(req.params);
    message.message = req.params.message;
    message.X = req.params.X;
    message.Y = req.params.Y;
    message.Z = req.params.Z;
    //console.log(message);
    message.save(function () {
      res.send(req.body);
    });
  }