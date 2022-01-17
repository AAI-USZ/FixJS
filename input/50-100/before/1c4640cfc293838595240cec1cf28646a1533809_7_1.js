function(req, menu, selected) {
  return "<a href='" + menu.url + "' title='" + req.t(menu.description) + "' class='" + this.name + "-menu-link" + selected + (menu.cls ? " " + menu.cls : "") + "'>" + req.t(menu.name) + "</a>";
}