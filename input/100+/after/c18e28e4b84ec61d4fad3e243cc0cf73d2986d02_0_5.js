function(step) {
  builder.selenium2.rcPlayback.findElement({'using': 'tag name', 'value': 'body'},
    /* success */
    function(id) {
      builder.selenium2.rcPlayback.send("GET", "/element/" + id + "/text", "",
        /* success */
        function(response) {
          if (response.value.indexOf(builder.selenium2.rcPlayback.param("text")) != -1) {
            builder.selenium2.rcPlayback.recordResult({success: true});
          } else {
            builder.selenium2.rcPlayback.recordResult({success: false, message: "Text not present."});
          }
        }
      );
    }
  );
}