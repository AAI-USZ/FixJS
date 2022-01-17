function() {//Returns true if the user is logged in and false if not
			if (!this.token) {
				var stored_api = JSON.parse(localStorage.getItem("auth_object"));
				_.extend(this, stored_api);
			}
            return (this.token !== null);
        }