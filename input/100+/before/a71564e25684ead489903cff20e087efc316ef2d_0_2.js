function(req, res){
  var email = req.params.user,
      id = req.params.id;

  if (!canStoreData) {
    res.json({ error: 'storage service is not running' }, 500);
    return;
  }

  UserModel.findOne( { email: email }, function( err, doc ) {
    for( var i=0; i<doc.projects.length; ++i ){
      if( String( doc.projects[ i ]._id ) === id ){
        res.send( doc.projects[ i ].html, { 'Content-Type': 'text/html' }, 201);
        return;
      }  
    }
    res.send(404);    
  });
  
}