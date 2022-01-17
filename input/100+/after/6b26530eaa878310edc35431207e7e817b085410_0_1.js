function(userdata) {
                userdata.username = username;
                _this.user = new User(userdata);
                _this.onLogin.apply();
            }