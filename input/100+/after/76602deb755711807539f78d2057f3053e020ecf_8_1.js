function route(req, res, module, app, next) {

  var aPerm = calipso.permission.Helper.hasPermission("admin:user");

  // Menu
  res.menu.admin.addMenuItem(req, {name:'Security', path: 'admin/security', weight: 5, url:'', description: 'Users, Roles & Permissions ...', permit:aPerm });
  res.menu.admin.addMenuItem(req, {name:'Users', path: 'admin/security/users', weight: 10, url: '/user/list', description: 'Manage users ...', permit:aPerm });
  res.menu.admin.addMenuItem(req, {name:'Logout', path:'admin/logout', weight: 100, url: '/user/logout', description: 'Logout', permit:aPerm });

  // Router
  module.router.route(req, res, next);

}