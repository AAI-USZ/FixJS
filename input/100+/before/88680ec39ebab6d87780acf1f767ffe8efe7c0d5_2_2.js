function(elementId) {
  var list =  eXo.wiki.UIUpload.listUpload;
  if(list.length < 1) return;
  var url = eXo.env.server.context + "/upload?" ;
  url += "action=progress" ;
//  var url =  eXo.env.server.context + "/upload?action=progress";  
  for(var i = 0; i < list.length; i++){
    url = url + "&uploadId=" + list[i];
  }

  var responseText = ajaxAsyncGetRequest(url, false);
  if(list.length > 0) {
    setTimeout("eXo.wiki.UIUpload.refeshProgress('" + elementId + "');", 1000); 
  }
    
  var response;
  try {
    eval("response = "+responseText);
  }catch(err) {
    return;  
  }
  
  for(id in response.upload) {
    var container = parent.document.getElementById(elementId);
    if (response.upload[id].status == "failed") {
      this.abortUpload(id);
      var message = eXo.core.DOMUtil.findFirstChildByClass(container, "div", "LimitMessage").innerHTML ;
      alert(message.replace("{0}", response.upload[id].size)) ;
//      alert(response.upload[id].message);
      continue;
    }
    var element = document.getElementById(id+"ProgressIframe");
    var percent  =   response.upload[id].percent;
    var progressBarMiddle = eXo.core.DOMUtil.findFirstDescendantByClass(container, "div", "ProgressBarMiddle") ;
    var blueProgressBar = eXo.core.DOMUtil.findFirstChildByClass(progressBarMiddle, "div", "BlueProgressBar") ;
    var progressBarLabel = eXo.core.DOMUtil.findFirstChildByClass(blueProgressBar, "div", "ProgressBarLabel") ;
    blueProgressBar.style.width = percent + "%" ;
    progressBarLabel.innerHTML = percent + "%" ;
    
    if(percent == 100) {
      var postUploadActionNode = eXo.core.DOMUtil.findFirstDescendantByClass(container, "div", "PostUploadAction") ;
      if(postUploadActionNode) {
        eXo.wiki.UIUpload.listUpload.remove(elementId);
        postUploadActionNode.onclick();
      } else {
        this.showUploaded(id, "");
      }
    }
  }
  
  if(eXo.wiki.UIUpload.listUpload.length < 1) return;

  if (element){
    element.innerHTML = "Uploaded "+ percent + "% " +
                        "<span onclick='parent.eXo.wiki.UIUpload.abortUpload("+id+")'>Abort</span>";
  }
}