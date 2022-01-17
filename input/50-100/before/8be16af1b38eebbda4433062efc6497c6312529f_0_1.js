function setCurrentView(viewName, obj) {
  if (current.view == viewName) {
    return;
  }
  if (!obj) {
    obj = $('#navlist a.view[rel=' + viewName + ']');
  }
  current.view = viewName;
  $('#navlist a.view').attr('class', 'view');
  obj.addClass('current');
  updateVisibleTorrents();
}