function() {

        if ( !changed ) {

          changed = true;
          window.onbeforeunload = function() {

            return "You have unsaved project data.";
          };
        }
      }