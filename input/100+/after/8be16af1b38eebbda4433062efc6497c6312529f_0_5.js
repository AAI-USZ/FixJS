function setCurrentSort(sortInfo, $obj) {
  if (!$obj) {
    $obj = $('#torrents-header a.sort[rel=' + sortInfo + ']');
  }
  var arr = sortInfo.split(':');
  var reversing = false;
  if (arr[0] == userSettings.sortVar) {
    reversing = true;
    userSettings.sortDesc = !userSettings.sortDesc;
  } else {
    userSettings.sortVar = arr[0];
    userSettings.sortDesc = (arr[1] == 'desc');
  }
  $('#torrents-header a.sort').attr('class', 'sort');
  $obj.addClass(userSettings.sortDesc ? 'sort-desc' : 'sort-asc');
  if (sortTorrents(null, arr.length > 2 && reversing)) {
    updateTorrentPositions();
  }
  saveUserSettings();
}