function(error, response, body){
    if (!error && response.statusCode == 200) {
      res.render('index.jade', {content:md(body)});
    }else{
      res.send('Error generating page, please try later on...');
    }
  }