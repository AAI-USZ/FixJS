function(elt) {
  // inpho.semantics.load
  // called on page load to import data from the querystring
  // into page
  params = inpho.semantics.get_params();

  // if there were no parameters, we have nothing to do
  if (!params) return false;

  // iterate over all combinations and build a table in elt
  for(var ci=0; ci < params.corpora.length; ci++) { // For each corpus,
    for(var mi=0; mi < params.models.length; mi++) { // for each model,
      for(var pi=0; pi < params.phrases.length; pi++) { // and for each phrase...
        var corpus = params.corpora[ci];
        var model  = params.models[mi];
        var phrase = params.phrases[pi];

        // only if valid
        if (!(corpus && model && phrase))
          continue;

        // ... construct a query ...
        var query = { 'corpus' : corpus,
                      'model' : model,
                      'phrase' : phrase,
                      'searchLimit' : params.searchLimit };

        // Since this is the first time we're encountering each phrase,
        // add it to the object inpho.semantics.cache and give it
        // a colour.
        var hueCap = 127.0;
        var colorStep = ((hueCap*3.0) / params.phrases.length);
        var colorTotal = colorStep * pi;
        var r = Math.floor((colorTotal % hueCap) + 127);
        var g = Math.floor((((colorTotal / hueCap) * colorStep) % hueCap) + 127);
        var b = Math.floor((((((colorTotal / hueCap) * colorStep) / hueCap) * colorStep) % hueCap) + 127);
        var color = "rgb(" + r + "," + g + "," + b + ")";

        inpho.semantics.cache["phrases"][phrase] = inpho.semantics.cache["phrases"][phrase] || {"backgroundcolor":color};
        
        var successFunction = function(query){
          return function(data){
            inpho.semantics.renderQueryResult(elt, query, data);
          };
        }(query);

        var errorFunction = function(query){
          return function(jqXHR){
            inpho.semantics.renderQueryError(elt, query, jqXHR);
          }          
        }(query);
        
        // ... and send it.
        $.get("/data", query, 'json')
          .success( successFunction )
          .error( errorFunction );
      }
    }
  }
}