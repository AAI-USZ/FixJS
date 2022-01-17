function (e) {
    e.preventDefault();
    var current = PTL.editor.units[PTL.editor.activeUid],
        prevNextMap = {previous: current.prev, next: current.next},
        newUid = prevNextMap[$(e.target).attr("class")];

    // Try loading the prev/next unit
    if (newUid != null) {
      var newHash = PTL.utils.updateHashPart("unit", parseInt(newUid), ["page"]);
      $.history.load(newHash);
    } else {
      if ($(e.target).attr("class") == 'previous') {
        PTL.editor.displayError(gettext("You reached the beginning of the list"));
      } else {
        PTL.editor.displayError(gettext("You reached the end of the list"));
      }
    }
  }