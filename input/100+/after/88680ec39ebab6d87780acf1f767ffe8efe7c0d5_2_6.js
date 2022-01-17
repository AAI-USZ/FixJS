function(clickEle, id) {
  var container = parent.document.getElementById(id);  
  var uploadFrame = parent.document.getElementById(id+"uploadFrame");
  var form = uploadFrame.contentWindow.document.getElementById(id);

  var file  = gj(form).find('#WikiUploadFile')[0];
  if(file.value == null || file.value == '') return;  
  var infoUploaded = gj(container).find('div.FileNameLabel')[0];
  var temp = file.value;

  if (temp.indexOf('/') != -1) {
    temp = temp.substr((temp.lastIndexOf('/') + 1), temp.length - 1) ;
  }
  
  if (temp.indexOf('\\') != -1) {
    temp = temp.substr((temp.lastIndexOf('\\') + 1), temp.length - 1) ;
  }
  
  infoUploaded.innerHTML = temp ;

  var progressBarFrame = gj(container).find('div.ProgressBarFrame')[0];
  progressBarFrame.style.display = "block" ;  
  var progressBarMiddle = gj(container).find('div.ProgressBarMiddle')[0];
  var blueProgressBar = gj(progressBarMiddle).find('div.BlueProgressBar')[0];
  var progressBarLabel = gj(blueProgressBar).find('div.ProgressBarLabel')[0];
  blueProgressBar.style.width = "0%" ;
  progressBarLabel.innerHTML = "0%" ;
  
  var  input = parent.document.getElementById('input' + id);
  input.value = "true";
  
  var uploadIframe = gj(container).find('#'+id+'UploadIframe')[0];
  uploadIframe.style.display = "none";
  var progressIframe = gj(container).find('#'+id+'ProgressIframe')[0];
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