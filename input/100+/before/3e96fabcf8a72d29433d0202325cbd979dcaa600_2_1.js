function defineRoutes() {
      module.router.addRoute(/.*/, loginForm, { end: false, template: 'login', block: 'user.login' }, this.parallel());
      module.router.addRoute('GET /login', loginPage, { end: false, template: 'loginPage', block: 'content.login' }, this.parallel());
      module.router.addRoute('POST /user/login',loginUser,null,this.parallel());
      module.router.addRoute('GET /user/list',listUsers,{end:false,admin:true,template:'list',block:'content.user.list'},this.parallel());
      module.router.addRoute('GET /user/logout',logoutUser,null,this.parallel());
      module.router.addRoute('GET /user/register',registerUserForm,{block:'content'},this.parallel());
      module.router.addRoute('POST /user/register',registerUser,null,this.parallel());
      module.router.addRoute('GET /user',myProfile,{template:'profile',block:'content'},this.parallel());
      module.router.addRoute('GET /user/profile/:username',userProfile,{template:'profile',block:'content'},this.parallel());
      module.router.addRoute('POST /user/profile/:username',updateUserProfile,{block:'content'},this.parallel());
      module.router.addRoute('GET /user/profile/:username/edit',updateUserForm,{block:'content'},this.parallel());
      module.router.addRoute('GET /user/profile/:username/lock',lockUser,{admin:true},this.parallel());
      module.router.addRoute('GET /user/profile/:username/unlock',unlockUser,{admin:true},this.parallel());
      module.router.addRoute('GET /user/profile/:username/delete',deleteUser,{admin:true},this.parallel());

    }