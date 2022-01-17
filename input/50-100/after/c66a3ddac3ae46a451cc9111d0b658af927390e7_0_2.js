function(data)
      {
        result = jQuery.parseJSON( data );
        // alert (result)
        window.console.log(result);
        $("#score").html(Math.floor(result.score))
        $("#level").html(Math.floor(result.level))
      }