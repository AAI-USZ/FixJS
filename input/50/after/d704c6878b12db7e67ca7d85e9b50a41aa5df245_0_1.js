function(req, res) {
    //console.log(JSON.stringify(req.body));
    //console.log('req.body', req.body.gene);
    db.findAllExpression(req.body.gene);
}