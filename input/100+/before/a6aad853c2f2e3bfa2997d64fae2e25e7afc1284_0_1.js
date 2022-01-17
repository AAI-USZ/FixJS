function(req, res){
     var userId = req.body.user;
     var authToken = req.body.authToken;
     if ( isValid(userId, authToken) ) {
        patientInfo.findById(userId , function (err, doc) {
            if (err) {
              res.send({'status' : err , data : null});
              throw err;
            }
            res.send({'status' : 'ok' , data : doc});
        });
     }
     else {
        res.send({'status' : 'permission denied' , data : null});
     }
}