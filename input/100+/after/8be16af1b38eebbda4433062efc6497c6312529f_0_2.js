function sortTorrents($torrentDivsAll, reorderAll) {
  if (!userSettings.sortVar) {
    // no sort order is defined
    return false;
  }
  if (!$torrentDivsAll) {
    $torrentDivsAll = $('#torrents>div.torrent-container');
  }
  var runs = [];
  var els = $torrentDivsAll.toArray();
  var len = els.length;

  for (var i = 0; i < len; i++) {
    // set the before-sort position to ensure a stable sort
    window.data.torrents[els[i].id].sortPos = i;
  }

  var toMove = [];
  var anyVisibleMoved = false;
  var elsSorted = null;

  if (reorderAll) {

    els.sort(getTorrentsComparer());
    elsSorted = els;

  } else {

    var result = patienceSort(els, getTorrentsComparer());
    elsSorted = result.sorted;

    if (result.subseq.length == len) {
      // the list was already sorted
      return false;
    }

    // figure out which divs to move, and where
    toMove = new Array(len - result.subseq.length);
    if (toMove.length >= len - 5) {

      /* if we can avoid 5 or more moves, do it; otherwise, just
       * reorder everything
       */
      reorderAll = true;

    } else {

      var iSubseq = 0, subseqLen = result.subseq.length;
      var iToMove = 0, after = 't-none';
      for (var i = 0; i < len; i++) {
        var item = result.sorted[i];
        if (iSubseq < subseqLen && item.id == result.subseq[iSubseq].id) {
          iSubseq++;
        } else {
          if (!anyVisibleMoved && data.torrents[item.id].visible) {
            anyVisibleMoved = true;
          }
          toMove[iToMove++] = {
            after: after,
            item: item
          };
        }
        after = item.id;
      }
    }
  }

  if (reorderAll) {
    // [almost] everything was reordered, so just reorder everything
    var t = $('#torrents');
    $(elsSorted).each(function() {
      t.append(this);
    });
  } else {
    for (var i = 0; i < toMove.length; i++) {
      var move = toMove[i];
      $('#' + move.after).after(move.item);
    }
  }

  return reorderAll || anyVisibleMoved;
}