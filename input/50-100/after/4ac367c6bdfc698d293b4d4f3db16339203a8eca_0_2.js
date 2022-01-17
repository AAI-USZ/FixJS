function(corpus, model, phrase, width){
  var query = { 'corpus' : corpus,
                'model' : model,
                'phrase' : phrase,
                'matrixWidth' : width };
  $.get("/export", query, 'json')
    .success( function(data) {
    })
    .error( function(error) {
      console.log(error.responseText);
    });
}