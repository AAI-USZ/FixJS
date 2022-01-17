function(uploadId, isAutoUpload) {
    var url = eXo.env.server.context + "/upload?";
    url += "action=progress&uploadId=" + uploadId;
    var responseText = ajaxAsyncGetRequest(url, false);

    var response;
    try {
      eval("response = " + responseText);
    } catch (err) {
      return;
    }
    this.isAutoUpload = isAutoUpload;
    if (response.upload[uploadId] == undefined
        || response.upload[uploadId].percent == undefined) {
      // eXo.webui.UIUpload.listLimitMB.push();
      this.createUploadEntry(uploadId, isAutoUpload);
    } else if (response.upload[uploadId].percent == 100) {
      this.showUploaded(uploadId, (response.upload[uploadId].fileName));
    }
  }