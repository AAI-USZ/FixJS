function(id, fileName) {
  eXo.wiki.UIUpload.listUpload.remove(id);
  var container = parent.document.getElementById(id);
  var element = document.getElementById(id+"ProgressIframe");
  element.innerHTML =  "<span></span>";
  
  var uploadIframe = gj(container).find('#'+id+'UploadIframe')[0];
  uploadIframe.style.display = "none";
  var progressIframe = gj(container).find('#'+id+'ProgressIframe')[0];
  progressIframe.style.display = "none";
    
  var selectFileFrame = gj(container).find('div.SelectFileFrame')[0];
  // selectFileFrame.style.display = "block" ;
  var fileNameLabel = gj(selectFileFrame).find('div.FileNameLabel')[0];
  if(fileName != null) fileNameLabel.innerHTML += " " + fileName;
  var progressBarFrame = gj(container).find('div.ProgressBarFrame')[0];
  progressBarFrame.style.display = "none" ;
  var tmp = element.parentNode;
  var temp = tmp.parentNode;
  //TODO: dang.tung - always return true even we reload browser
  var  input = parent.document.getElementById('input' + id);
  input.value = "true" ;  
}