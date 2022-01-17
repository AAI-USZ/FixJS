function(user) {
                me.core.addModel('users', user);
                me.invalidate();
                me.select(user)
            }