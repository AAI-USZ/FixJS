function (topicId, renderFunction) {
    var url = baseUrl + "getGeoObjectInfo.php?topicId="+topicId;
    // var body = '{"method": "getGeoObjectInfo", "params": ["' + topicId+ '"]}';
    jQuery.ajax({
      type: "GET", async: false,
      // data: body, 
      url: url, dataType: 'json',
      beforeSend: function(xhr) { 
        xhr.setRequestHeader("Content-Type", "application/json");
      },
      success: function(obj) {
        // console.log('loaded \"' + obj.result.name + '\"');
        renderFunction(obj.result);
      },
      error: function(x, s, e) {
        throw new Error('ERROR: detailed information on this point could not be loaded. please try again. ' + x);
      }
    });
  }