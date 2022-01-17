function route(req, res, module, app, next) {

  // Menu
  res.menu.admin.addMenuItem(req, {name:'Security', path: 'admin/security', weight: 5, url:'', description: 'Users, Roles & Permissions ...', security: [] });
  res.menu.admin.addMenuItem(req, {name:'Users', path: 'admin/security/users', weight: 10, url: '/user/list', description: 'Manage users ...', security: [] });
  res.menu.admin.addMenuItem(req, {name:'Logout', path:'admin/logout', weight: 100, url: '/user/logout', description: 'Logout', security: [] });

  roles.route(req, res, module, app);

  // Router
  module.router.route(req, res, next);

}