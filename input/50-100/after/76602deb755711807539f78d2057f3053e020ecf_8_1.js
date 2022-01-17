function(err) {
      if(err) {
        req.flash('info',req.t('Unable to delete the user because {msg}',{msg:err.message}));
        res.redirect("/user/list");
        return;
      } else {
        calipso.e.post_emit('USER_DELETE',u);
        req.flash('info',req.t('The user has now been deleted.'));
        res.redirect("/user/list");
        return;
      }
      next();
    }