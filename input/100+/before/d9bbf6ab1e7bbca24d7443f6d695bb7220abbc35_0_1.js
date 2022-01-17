function(elementId) {
    var list = eXo.webui.UIUpload.listUpload;
    if (list.length < 1)
      return;
    var url = eXo.env.server.context + "/upload?";
    url += "action=progress";
    // var url = eXo.env.server.context + "/upload?action=progress";
    for ( var i = 0; i < list.length; i++) {
      url = url + "&uploadId=" + list[i];
    }
    var responseText = ajaxAsyncGetRequest(url, false);
    if (list.length > 0) {
      setTimeout("eXo.webui.UIUpload.refreshProgress('" + elementId + "');",
          1000);
    }

    var response;
    try {
      eval("response = " + responseText);
    } catch (err) {
      return;
    }

    for (id in response.upload) {
      var container = parent.document.getElementById(elementId);
      var jCont = gj(container);
      if (response.upload[id].status == "failed") {
        this.abortUpload(id);
        var message = jCont.children(".LimitMessage").first().html();
        message = message.replace("{0}", response.upload[id].size);
        message = message.replace("{1}", response.upload[id].unit);
        alert(message);
        continue;
      }
      var element = document.getElementById(id + "ProgressIframe");
      var percent = response.upload[id].percent;
      var blueProgressBar = jCont.find(".ProgressBarMiddle .BlueProgressBar").first();
      var progressBarLabel = blueProgressBar.children(".ProgressBarLabel").first();
      blueProgressBar.css("width", percent + "%");

      progressBarLabel.html(percent + "%");
      if (percent == 100) {
        this.showUploaded(id, response.upload[id].fileName);
      }
    }

    if (eXo.webui.UIUpload.listUpload.length < 1)
      return;

    if (element) {
      element.innerHTML = "Uploaded " + percent + "% "
          + "<span onclick='parent.eXo.webui.UIUpload.abortUpload(" + id
          + ")'>Abort</span>";
    }
  }