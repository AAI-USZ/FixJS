function() {
      $("#session-modal").modal("show");
      //Save the current session just in case
      window.app.get("currentSession").save();
      //Clone it and send its clone to the session modal so that the users can modify the fields and then change their mind, wthout affecting the current session.
      window.appView.sessionModalView.model = window.app.get("currentSession").clone();
      //Give it a null id so that pouch will save it as a new model.
      //WARNING this might not be a good idea, if you find strange side effects in sessions in the future, it might be due to this way of creating (duplicating) a session.
      window.appView.sessionModalView.model.id = undefined;
      window.appView.sessionModalView.model.rev = undefined;
      window.appView.sessionModalView.model.set("_id", undefined);
      window.appView.sessionModalView.model.set("_rev", undefined);
      window.appView.sessionModalView.render();
    }