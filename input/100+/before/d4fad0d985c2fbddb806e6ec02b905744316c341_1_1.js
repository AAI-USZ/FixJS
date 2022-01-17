function() {
        var range, userSelection;
        if (jQuery.browser.msie) {
          range = document.selection.createRange();
        } else {
          if (window.getSelection) {
            userSelection = window.getSelection();
          } else if (document.selection) {
            userSelection = document.selection.createRange();
          } else {
            throw "Your browser does not support selection handling";
          }
          if (userSelection.rangeCount > 0) {
            range = userSelection.getRangeAt(0);
          } else {
            range = userSelection;
          }
        }
        return range;
      }