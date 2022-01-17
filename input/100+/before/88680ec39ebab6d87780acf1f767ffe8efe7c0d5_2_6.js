function(clickEle, id) {
  var DOMUtil = eXo.core.DOMUtil;  
  var container = parent.document.getElementById(id);  
  var uploadFrame = parent.document.getElementById(id+"uploadFrame");
  var form = uploadFrame.contentWindow.document.getElementById(id);

  var file  = DOMUtil.findDescendantById(form, "WikiUploadFile");
  if(file.value == null || file.value == '') return;  
  var infoUploaded = eXo.core.DOMUtil.findFirstDescendantByClass(container, "div", "FileNameLabel") ;
  var temp = file.value;

  if (temp.indexOf('/') != -1) {
    temp = temp.substr((temp.lastIndexOf('/') + 1), temp.length - 1) ;
  }
  
  if (temp.indexOf('\\') != -1) {
    temp = temp.substr((temp.lastIndexOf('\\') + 1), temp.length - 1) ;
  }
  
  infoUploaded.innerHTML = temp ;

  var progressBarFrame = DOMUtil.findFirstDescendantByClass(container, "div", "ProgressBarFrame") ;
  progressBarFrame.style.display = "block" ;  
  var progressBarMiddle = DOMUtil.findFirstDescendantByClass(container, "div", "ProgressBarMiddle") ;
  var blueProgressBar = DOMUtil.findFirstChildByClass(progressBarMiddle, "div", "BlueProgressBar") ;
  var progressBarLabel = DOMUtil.findFirstChildByClass(blueProgressBar, "div", "ProgressBarLabel") ;
  blueProgressBar.style.width = "0%" ;
  progressBarLabel.innerHTML = "0%" ;
  
  var  input = parent.document.getElementById('input' + id);
  input.value = "true";
  
  var uploadIframe = DOMUtil.findDescendantById(container, id+"UploadIframe");
  uploadIframe.style.display = "none";
  var progressIframe = DOMUtil.findDescendantById(container, id+"ProgressIframe");
  progressIframe.style.display = "none";

  var tmp = progressIframe.parentNode;
  var temp = tmp.parentNode;
  
  form.submit() ;
  
  var list = eXo.wiki.UIUpload.listUpload;
  if(list.length == 0) {
    eXo.wiki.UIUpload.listUpload.push(form.id);
    setTimeout("eXo.wiki.UIUpload.refeshProgress('" + id + "');", 1000);
  } else {
    eXo.wiki.UIUpload.listUpload.push(form.id);  
  }
}