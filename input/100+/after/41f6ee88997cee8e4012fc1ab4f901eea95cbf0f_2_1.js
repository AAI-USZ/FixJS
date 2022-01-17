function (data) {
				self.error(null);

				Application.isLoggedIn(true);
				$('#login').modal('hide');
				Application.alerts.push({ type: "success", title: "Welcome back, " + data.FirstName + "!", text: "You have successfully logged in." });

				var options = {path: '/'};
				if (self.RememberMe()) {
					var expiration = new Date(data.SessionKey.Expires);
					options.expires = Math.round((expiration.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000));
				}

				$.cookie('userId', data.Id, options);
				$.cookie('sessionKey', data.SessionKey.Key, options);
				Application.user(data);
			}