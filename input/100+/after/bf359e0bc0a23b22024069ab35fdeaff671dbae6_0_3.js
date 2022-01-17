function(elt, query, jqXHR){
  // The responseText will relay the appropriate error message.
  var div = document.createElement('div');
  div.className = "queryResult";

  var corpusDiv = document.createElement('div');
  corpusDiv.className = "queryHeader";
  corpusDiv.innerHTML = inpho.semantics.getCorpusProperty( query.corpus, "short label");
  corpusDiv.style.backgroundColor = inpho.semantics.getCorpusProperty( query.corpus, "backgroundcolor" );
  corpusDiv.style.color = inpho.semantics.getCorpusProperty( query.corpus, "fontcolor" );
  $(div).append( corpusDiv );

  var modelDiv = document.createElement('div');
  modelDiv.className = "queryHeader";
  modelDiv.innerHTML = inpho.semantics.getModelProperty( query.model, "short label" );
  modelDiv.style.backgroundColor = inpho.semantics.getModelProperty( query.model, "backgroundcolor" );
  modelDiv.style.color = inpho.semantics.getModelProperty( query.model, "fontcolor");
  $(div).append( modelDiv );

  var phraseDiv = document.createElement('div');
  phraseDiv.className = "queryHeader";
  phraseDiv.innerHTML = query.phrase;
  phraseDiv.style.backgroundColor = inpho.semantics.getPhraseProperty( query.phrase, "backgroundcolor" );
  phraseDiv.style.color = "#fff"; //inpho.semantics.getPhraseProperty( query.phrase, "color" );
  $(div).append( phraseDiv );


  $(div).append("<div class='alert alert-error'>"+jqXHR.responseText+"</div>");
  $(elt).append(div);
  
  // log error in dev console
  console.log('Error! jqXHR.responseText: ' + jqXHR.responseText)
}