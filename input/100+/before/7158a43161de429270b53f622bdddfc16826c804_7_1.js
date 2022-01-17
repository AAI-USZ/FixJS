function() {
    builder.selenium2.playback.findElement(builder.selenium2.playback.param("locator"), function(result) {
      builder.selenium2.playback.execute('sendKeysToElement', {id: result.value.ELEMENT, value: builder.selenium2.playback.param("text").split("")});
    });
  }