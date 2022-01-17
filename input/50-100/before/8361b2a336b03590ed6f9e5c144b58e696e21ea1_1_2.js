function(e) {
			if (e.success == false) {
				var data = {
                    username: 'chatuser',
                    password: 'password',
                    password_confirmation: 'password'
                };
				Cloud.Users.create(data, created1);
			} else {
				created2(e);
			}
		}