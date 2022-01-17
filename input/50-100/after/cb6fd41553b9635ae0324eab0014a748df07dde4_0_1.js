function(err, count) {
      if (err) return res.send(500);
      
      if (1 == count) {
        collection.findOne({type: 'list', name: req.params.list}, function(err, doc) {
          if (err) return res.send(500);
          return res.send(doc, {'Content-Type': 'application/json'}, 200);
        })
      }
      else {
        return res.send(404);
      }
    }