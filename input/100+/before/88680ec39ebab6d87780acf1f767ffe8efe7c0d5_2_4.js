function(id) {
  eXo.wiki.UIUpload.listUpload.remove(id);
  var url = eXo.env.server.context + "/upload?" ;
  url += "uploadId=" +id+"&action=abort" ;
//  var url = eXo.env.server.context + "/upload?uploadId=" +id+"&action=abort" ;
  var request =  eXo.core.Browser.createHttpRequest();
  request.open('GET', url, false);
  request.setRequestHeader("Cache-Control", "max-age=86400");
  request.send(null);
  
  var container = parent.document.getElementById(id);
  var uploadIframe =  eXo.core.DOMUtil.findDescendantById(container, id+"UploadIframe");
  uploadIframe.style.display = "block";
  eXo.wiki.UIUpload.createUploadEntry(id, UIUpload.isAutoUpload);
  var progressIframe = eXo.core.DOMUtil.findDescendantById(container, id+"ProgressIframe");
  progressIframe.style.display = "none";

  var tmp = progressIframe.parentNode;
  var temp = tmp.parentNode;
//  var child = eXo.core.DOMUtil.getChildrenByTagName(temp,"label");
//  child[0].style.visibility =  "visible" ;
  var progressBarFrame = eXo.core.DOMUtil.findFirstDescendantByClass(container, "div", "ProgressBarFrame") ;
  progressBarFrame.style.display = "none" ;
  var selectFileFrame = eXo.core.DOMUtil.findFirstDescendantByClass(container, "div", "SelectFileFrame") ;
  selectFileFrame.style.display = "none" ;
   
  var  input = parent.document.getElementById('input' + id);
  input.value = "false";
}