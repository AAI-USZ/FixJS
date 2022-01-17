function(req, res){
     var manufacturerId = req.body.manufacturerId;
     var authToken = req.body.authToken;
     if ( isValidToken(manufacturerId, authToken) ) {
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