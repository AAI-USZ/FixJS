function(admin_id){
			var userKeys = _.without(_.keys(self.users), admin_id);
			self.admin = null;
			if(_.size(userKeys)){ 
				self.users[userKeys[0]].admin = true;
				self.admin = userKeys[0];
			}
		}