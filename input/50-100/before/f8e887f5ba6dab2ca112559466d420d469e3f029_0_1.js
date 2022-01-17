function(req, res){
  console.log("hi");
  var usergeneric = req.params.usergeneric
    , corpusordatalist = req.params.corpusordatalist;
  var corpusid = "";
  var datalistid = "";
  //TOOD look up the usergeneric, then look up the corpus id so that the backbone router will show/fetch that corpus, if it is a datalist, do that instead
//  res.redirect(apphttpsdomain+'#corpus/'+corpusid);
//  res.redirect("https://localhost:3001\#data/"+req.params.datalistid);
  res.redirect("https://localhost:3001\#corpus/"+req.params.corpusid);
}