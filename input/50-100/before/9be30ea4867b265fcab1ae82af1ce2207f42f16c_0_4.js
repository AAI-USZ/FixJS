function( settings){
		if ( null === settings ){
			args.app = 1;
			self.addNotificationSetting( args, function(err, data){
				args.app = 0;
				self.addNotificationSetting( args, function( err, data ){
					args.app = 2;
					self.addNotificationSetting( args, function( err, data ){
						callback(1);
					});
				});
			});
		}
	}