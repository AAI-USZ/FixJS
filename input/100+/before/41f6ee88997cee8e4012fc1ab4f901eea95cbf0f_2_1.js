function (data) {
				self.error(null);

				Application.isLoggedIn(true);
				$('#login').modal('hide');
				Application.alerts.push({ type: "success", title: "Yay!", text: "You have successfully logged in." });

				var options = {path: '/'};
				if (self.RememberMe()) {
					var expiration = new Date(data.SessionKey.Expires);
					options.expires = Math.round((expiration.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000));
				}

				$.cookie('userdata', ko.toJSON(data), options);
				Application.user(data);
			}