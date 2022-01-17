function(req, res) {
  var email = req.session.email,
      id = req.params.id;

  if (!email) {
    res.json({ error: 'unauthorized' }, 403);
    return;
  }

  if (!canStoreData) {
    res.json({ error: 'storage service is not running' }, 500);
    return;
  }

  UserModel.findOne( { email: email }, function( err, doc ) {
    for( var i=0; i<doc.projects.length; ++i ){
      if( String( doc.projects[ i ]._id ) === id ){
        returnVal = { error: "okay", project: doc.projects[ i ].data };
        res.json( returnVal );
        return;
      }
    }
    res.json( { error: "project not found" } );
  });
}