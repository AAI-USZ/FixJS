function (req, res){
    var userName = req.userName;
    if (isWebsiteAuthenticated){
      patientInfo.findOne({'userName' : userName} , function(err , doc){
        if (err){
          throw err;
        }
        else{
          var token = generateAuthToken;
          res.send({'status' : ok , 'data' : doc}); 
        }
      });
    }
    else{
      res.send({'status' : 'permission denied' , 'data' : null});
    }
}