function(url, fileDataKey) {
    /* method to be used for each uploading file and must be called on <li> element,
     created in previous method and contain file as jQuery.data().
   * Method send files by XMLHttpRequest() as binary data, emulating file request structure.
   * url - the URL to send request,
   * postDataKey - string, which will key of $_FILE array in server (analog value of <input> 'name' attribute .
   */
    if( ! this.data("file") || this.data("file") == "" || this.hasClass("finished")) return this;
    var progress = this.children("div.progress"),
    fill = progress.children("div"),
    note = this.children("span.note"),
    file = this.data("file"),
    li = this;

    var xhr = new XMLHttpRequest();
 /*   var opera = "";
    for (var i in xhr) {
      opera += "'"+i+"': "+ xhr[i] + "\n"
    }
    alert (opera);
 */
  if(xhr.upload) {
    xhr.upload.addEventListener("progress", function(e) {
      if (e.lengthComputable) fill.width((e.loaded * 100) / e.total + "%");
    }, false);
  }
    // load and error events handlers
    xhr.onreadystatechange = function () {
      var obj, errorText = "";
      if (this.readyState == 4) {
        var xhr = this;
        fill.width("100%").parent().fadeOut(function(){
          li.addClass("finished");

          if(xhr.status == 200) {
            try {
              obj = $.parseJSON(xhr.responseText);
              for (var i in obj) errorText += obj[i]+" ";
              note.text(errorText).parent().addClass("error");
            }
            catch(e) {
              if(xhr.responseText == "Ok")  {
                note.parent().addClass("ok");
              }
            }

          } else {
            note.text(global_config.upload_notes.error + " status:" + xhr.status).parent().addClass("error");
          }
        });
      }
    };

    xhr.open("POST", url);

    if(window.FormData) {
      // W3C (Chrome, Safari, Firefox 4+)
      var formData = new FormData();
      formData.append(fileDataKey, file);
      xhr.send(formData);
    }

    else if (window.FileReader && xhr.sendAsBinary) {
      // FF < 4
      var boundary = "xxxxxxxxx";
      // headers setting
      xhr.setRequestHeader("Content-Type", "multipart/form-data, boundary="+boundary);
      xhr.setRequestHeader("Cache-Control", "no-cache");
      // body setting
      var body = "--" + boundary + "\r\n";
      body += "Content-Disposition: form-data; name='" + fileDataKey + "'; filename='" + file.name + "'\r\n";
      body += "Content-Type: application/octet-stream\r\n\r\n";
      body += (file.getAsBinary ? file.getAsBinary() : file.readAsBinary()) + "\r\n";
      body += "--" + boundary + "--";

      xhr.sendAsBinary(body);
    }

    else {
      // Other
      xhr.setRequestHeader('Upload-Filename', file.name);
      xhr.setRequestHeader('Upload-Size', file.size);
      xhr.setRequestHeader('Upload-Type', file.type);
      xhr.send(file);
    }


    return li;
  }