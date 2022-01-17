function (response, postdata) {
        var success = true;
        var message = "";
        var json = jQuery.parseJSON(response.responseText);
        if(json.errors) {
          success = false;
          for(i=0; i < json.errors.length; i++) {
            message += json.errors[i] + '<br/>';
          }
        }
        if(json.error) {
          success = false;
          message +=json.error;
        }
        $(this).jqGrid('setGridParam', {datatype:'json'});
        updateMarkers();
        return [success,message];
      }