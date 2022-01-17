function onHashChange() {
  var newLocation = _$_WT_CLASS_$_.history.getCurrentState();

  if (newLocation.length > 0 && newLocation.substr(0, 1) != '/')
    return;

  if (currentHash == newLocation)
    return;

  currentHash = newLocation;
  setTimeout(function() { update(null, 'hash', null, true); }, 1);
}