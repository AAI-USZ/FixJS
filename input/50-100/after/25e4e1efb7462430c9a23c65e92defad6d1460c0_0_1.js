function(result) {
      builder.selenium2.playback.execute('clickElement', {id: result.value.ELEMENT},
        function() {
          builder.selenium2.playback.execute('clearElement', {id: result.value.ELEMENT},
            function() {
              builder.selenium2.playback.execute('sendKeysToElement', {id: result.value.ELEMENT, value: builder.selenium2.playback.param("text").split("")});
            }
          );
        }
      );
    }