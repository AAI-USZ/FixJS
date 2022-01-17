function(req, res) {
    checkSetId(req, res);
    var wid = req.params.wid,
        did = req.params.did;
    var voteup = req.body.up;
    var change = (voteup == 'true') ? { $inc : { uv : 1 }} : { $inc : { dv : 1 }}
    WordModel.findOne( { _id : wid }, function(err, doc) {
	if (!err) {
	    console.log(doc.defs.id(did).uv.$inc());
	    console.log(doc.defs.id(did).uv);
	    if (voteup == 'true') {
		doc.defs.id(did).uv.$inc();
	    } else {
		doc.defs.id(did).dv.$inc();
	    }
	    doc.save(function(err) {
		console.log(err);
		console.log(doc);
	    });
	}
    })
    res.send({success: true});
}