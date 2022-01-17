function() {
      var verbType = $("#verb").val();
      var params;
      if (phoneOn) {
        params = params = {
          "verb": verbType,
          "demo": "true",
          "To": localStorage['phoneNumber']
        };
        $.post('/requestCall', 
    				params,
    				function(data) {
    					alert("Made call:" + data);
    				}
    			);
      } else {
        params = params = {
          "verb": verbType,
          "demo": "true"
        };
        Twilio.Device.connect(params);
      }
      
    }