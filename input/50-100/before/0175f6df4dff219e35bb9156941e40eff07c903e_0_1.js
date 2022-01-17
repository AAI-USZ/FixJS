function (user) {
				this.append(user + ' disconnected.');
				users.fetch();
			}