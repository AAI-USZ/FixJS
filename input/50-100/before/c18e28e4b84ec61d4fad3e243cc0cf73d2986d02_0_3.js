function(responseText) {
          var response = JSON.parse(responseText);
          if (response.value.indexOf(builder.selenium2.rcPlayback.param("text")) != -1) {
            builder.selenium2.rcPlayback.recordResult({success: true});
          } else {
            builder.selenium2.rcPlayback.recordResult({success: false, message: "Text not present."});
          }
        }