function(evt){
      // prevent nav from happening if the user is using the arrow keys to navigate through their comment text
      if($(evt.target).is("textarea")) { return }

      switch(evt.keyCode) {
        case KEYCODES.LEFT:
          app.router.navigate(model.get("next_post"), true); break;
        case KEYCODES.RIGHT:
          app.router.navigate(model.get("previous_post"), true); break;
        default:
          break;
      }
    }