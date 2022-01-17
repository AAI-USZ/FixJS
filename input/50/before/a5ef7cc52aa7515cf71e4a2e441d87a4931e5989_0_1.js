function(error, response, body){
    if (!error && response.statusCode == 200) {
      res.render('index.jade',{content:md.markdown.toHTML(body)});
    }
  }