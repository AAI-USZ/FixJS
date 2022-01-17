function visibility(e) {
  if (!document.mozHidden) {
    Recents.render();
    Recents.startUpdatingDates();
  } else {     
    Recents.stopUpdatingDates();
  }
}