function(result) {
        if (!result.value) {
          builder.selenium2.playback.execute('clickElement', {id: target});
        } else {
          builder.selenium2.playback.recordResult({success: true});
        }
      }