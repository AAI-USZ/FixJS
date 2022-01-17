function() {

      if ( !changed ) {

        changed = true;
        window.onbeforeunload = areYouSure;
      }
    }