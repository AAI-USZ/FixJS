function(admin_id){
			var userKeys = _.without(_.keys(self.users), admin_id);

			if(_.size(userKeys)){ 
				self.users[userKeys[0]].admin = true;
				self.admin = userKeys[0];
			}
		}