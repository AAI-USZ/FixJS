function(req, res) {
  db.collection(req.params.library + '.files', function(err, collection) {
    if (err) return res.send(500);
    
    var stream = collection.find().stream();
    var list = [];
    
    stream.on('data', function(data) {
      list.push(data.metadata);
    })
    
    stream.on('close', function() {
      res.json(list);
    })
  })
}