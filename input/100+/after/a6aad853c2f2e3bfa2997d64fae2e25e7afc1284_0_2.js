function (req, res){
    var userName = req.userName;
    var password = req.password;
    var manufacturerId = req.manufacturerId;
    if (isWebsiteAuthenticated(userId, password)){
      patientInfo.findOne({'userName' : userName} , function(err , doc){
        if (err){
          throw err;
        }
        else{
          var token = generateAuthToken(manufacturerId);
          doc.authToken = token;
          res.send({'status' : ok , 'data' : doc}); 
        }
      });
    }
    else{
      res.send({'status' : 'permission denied' , 'data' : null});
    }
}