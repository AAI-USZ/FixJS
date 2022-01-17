function(data)
      {
        result = jQuery.parseJSON( data );
        // alert (result)
        window.console.log(result);
        $("#score").html(result.score)
        $("#level").html(result.level)
      }