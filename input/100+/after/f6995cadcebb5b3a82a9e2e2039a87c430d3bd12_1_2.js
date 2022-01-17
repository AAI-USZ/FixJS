function(successCallback, failCallback) {
    if(VISH.Debugging.isDevelopping()) {
      if(typeof successCallback == "function") {
        successCallback(VISH.Samples.API.thumbnailsList)
      }
      return
    }
    $.ajax({async:false, type:"GET", url:"/excursion_thumbnails.json", dataType:"json", success:function(data) {
      if(typeof successCallback == "function") {
        successCallback(data)
      }
    }, error:function(xhr, ajaxOptions, thrownError) {
      if(typeof failCallback == "function") {
        failCallback(xhr, ajaxOptions, thrownError)
      }
    }})
  }