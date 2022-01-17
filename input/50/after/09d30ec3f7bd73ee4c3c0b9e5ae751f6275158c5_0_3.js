function(ev) {
        if (13 === ev.keyCode) {
          $createButton.click();
          ev.preventDefault();
        }
        return null;
      }