function(evt, xhr) {
    resp = JSON.parse(xhr.responseText)
    if(resp.success) {
      this.uploadSuccess(resp)
    } else {
      alert("Upload failed!  Check your URL.");
      this.render()
    }
  }