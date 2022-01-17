function(corpus, corpusParam, model, phrase, width){
  var query = { 'corpus' : corpus,
                'corpusParam' : corpusParam,
                'model' : model,
                'phrase' : phrase,
                'matrixWidth' : width };
  console.log(query);
  $.get("/export", query, 'json')
    .success( function(data) {
      console.log(data);
    })
    .error( function(error) {
      console.log(error.responseText);
    });
}