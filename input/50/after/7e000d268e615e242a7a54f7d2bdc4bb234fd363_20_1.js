function copyPref()
{
  var pref = gPrefView[view.selection.currentIndex];
  gClipboardHelper.copyString(pref.prefCol + ';' + pref.valueCol, document);
}