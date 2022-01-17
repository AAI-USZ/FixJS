function(id) {
  eXo.wiki.UIUpload.listUpload.remove(id);
  var url = eXo.env.server.context + "/upload?" ;
  url += "uploadId=" +id+"&action=abort" ;
//  var url = eXo.env.server.context + "/upload?uploadId=" +id+"&action=abort" ;
  gj.get(url);
  
  var container = parent.document.getElementById(id);
  var uploadIframe = gj(container).find('#'+id+'UploadIframe')[0];
  uploadIframe.style.display = "block";
  eXo.wiki.UIUpload.createUploadEntry(id, UIUpload.isAutoUpload);
  var progressIframe = gj(container).find('#'+id+"ProgressIframe")[0];
  progressIframe.style.display = "none";

  var tmp = progressIframe.parentNode;
  var temp = tmp.parentNode;
  var progressBarFrame = gj(container).find('div.ProgressBarFrame')[0];
  progressBarFrame.style.display = "none" ;
  var selectFileFrame = gj(container).find('div.SelectFileFrame')[0];
  selectFileFrame.style.display = "none" ;
   
  var  input = parent.document.getElementById('input' + id);
  input.value = "false";
}