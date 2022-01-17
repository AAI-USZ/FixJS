function(e, el) {
    model.set('_session.userId', model.get('_loadUserId'));
    return window.location.reload();
  }