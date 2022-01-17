function(err, docs){
    if(err) res.send(error, 500)
    else{
      res.render('index', { title: 'Memo2', memos: docs});
    }
  }