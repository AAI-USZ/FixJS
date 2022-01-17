function(uploadId, uploadAction, isAutoUpload) {
  var container = parent.document.getElementById(uploadId);
  var uploadIframe = gj(container).find('#'+uploadId+ 'UploadIframe')[0];
  var uploadText = uploadIframe.title;
  var delta = 6;
  if (gj.browser.msie !=undefined) delta = 9;
  var size = String(uploadText).length;
  if (size < 21) {
    size = 1;
  } else {
    size = 1 + Math.round((size*delta - 100)/9);
  }
  var uploadHTML = "";  
  uploadHTML += "  <form id='"+uploadId+"' class='UIUploadForm' style='margin: 0px; padding: 0px' action='"+uploadAction+"' enctype='multipart/form-data' method='post'>";
  uploadHTML += "    <div class='BrowseDiv'>";
  uploadHTML += "      <div class='InputContent'>";
  uploadHTML += "        <input type='file' name='file' size='" + size + "' id='WikiUploadFile' class='FileHidden' value='' title='" + uploadText + "' onchange='eXo.wiki.UIUpload.upload(this, " + uploadId + ")'/>";
  uploadHTML += "        <label for='WikiUploadFile' class='BrowseLink'>" + uploadText + "</label>";
  uploadHTML += "      </div>";
  uploadHTML += "    </div>";
  uploadHTML += "  </form>";
  return uploadHTML;
}