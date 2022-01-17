function(user) {
        user.is_current = self.currentUserId == id;
        var model = new UserModel(user);
        var view = new UserView({model: model});
        self.setView(view, model.get('user_name'));
      }