function inject_menu(params, callback) {
  var ids = ['common', this.request.namespace],
      data = this.response.data;

  if (!this.origin.http || 'common.menu_permissions' === this.request.method) {
    callback(null);
    return;
  }

  get_menu_permissions(ids, this, function (err, perms) {
    data.menus = nodeca.shared.common.menus.build(ids, perms, nodeca.runtime.router);
    callback(err);
  });
}