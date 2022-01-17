function onHashChange() {
  var newLocation = _$_WT_CLASS_$_.history.getCurrentState();
  if (currentHash == newLocation) {
    return;
  } else {
    currentHash = newLocation;
    setTimeout(function() { update(null, 'hash', null, true); }, 1);
  }
}