function (dataToUpload) {
    var oXHR = new XMLHttpRequest();
    oXHR.open("POST", "http://profile-logs.appspot.com/store", true);
    oXHR.onload = function (oEvent) {
      if (oXHR.status == 200) {  
        document.getElementById("upload_status").innerHTML = document.URL.split('?')[0] + "?report=" + oXHR.responseText;
      } else {  
        document.getElementById("upload_status").innerHTML = "Error " + oXHR.status + " occurred uploading your file.";
      }  
    };

    var dataSize;
    if (dataToUpload.length > 1024*1024) {
      dataSize = (dataToUpload.length/1024/1024) + " MB(s)";
    } else {
      dataSize = (dataToUpload.length/1024) + " KB(s)";
    }

    var formData = new FormData();
    formData.append("file", dataToUpload);
    document.getElementById("upload_status").innerHTML = "Uploading Profile (" + dataSize + ")";
    oXHR.send(formData);
  }