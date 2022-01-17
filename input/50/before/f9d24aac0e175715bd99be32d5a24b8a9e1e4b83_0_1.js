function Finder_changeStatus(element, src) {
  //debugBrowserObject(element);
  var handle = src+"/finder/finder.php?action=A_change_mode&amp;frm_mode="+element.value;
  dcomSendRequest(handle);
}