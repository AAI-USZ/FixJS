function(err, docs){
    if(err) res.send(error, 500)
    else{
      res.render('index', { title: 'Express', memos: docs});
    }
  }