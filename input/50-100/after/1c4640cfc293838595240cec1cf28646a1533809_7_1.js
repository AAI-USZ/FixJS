function(req, menu, selected) {
  var popup = menu.popup ? 'popupMenu' : '';
  return "<a href='" + menu.url + "' title='" + req.t(menu.description) + "' class='" + popup + " " + this.name + "-menu-link" + selected + (menu.cls ? " " + menu.cls : "") + "'>" + req.t(menu.name) + "</a>";
}