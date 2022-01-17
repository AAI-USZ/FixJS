function(event){
  event.preventDefault();
  var corpus = $("#exportCorpus").val();
  var model  = $("#exportModel" ).val();
  var phrase = $("#exportPhrase").val();
  var width  = $("#exportCount" ).val();
  $(".modal-footer", "#exportModal").append("<img src='lib/img/loading.gif' />");
  inpho.semantics.exportQuery(corpus, model, phrase, width);
}