function(id, fileName) {
  eXo.wiki.UIUpload.listUpload.remove(id);
  var container = parent.document.getElementById(id);
  var element = document.getElementById(id+"ProgressIframe");
  element.innerHTML =  "<span></span>";
  
  var uploadIframe = eXo.core.DOMUtil.findDescendantById(container, id+"UploadIframe");
  uploadIframe.style.display = "none";
  var progressIframe = eXo.core.DOMUtil.findDescendantById(container, id+"ProgressIframe");
  progressIframe.style.display = "none";
    
  var selectFileFrame = eXo.core.DOMUtil.findFirstDescendantByClass(container, "div", "SelectFileFrame") ;
  // selectFileFrame.style.display = "block" ;
  var fileNameLabel = eXo.core.DOMUtil.findFirstDescendantByClass(selectFileFrame, "div", "FileNameLabel") ;
  if(fileName != null) fileNameLabel.innerHTML += " " + fileName;
  var progressBarFrame = eXo.core.DOMUtil.findFirstDescendantByClass(container, "div", "ProgressBarFrame") ;
  progressBarFrame.style.display = "none" ;
  var tmp = element.parentNode;
  var temp = tmp.parentNode;
  //TODO: dang.tung - always return true even we reload browser
  var  input = parent.document.getElementById('input' + id);
  input.value = "true" ;  
}