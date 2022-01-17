function(event) {
          var keyCode;
          keyCode = event.which | event.keyCode;
          return keyCode !== 13 && keyCode !== 38 && keyCode !== 40;
        }