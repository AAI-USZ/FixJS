function( err, data){
			args.attribute = 3;
			self.addNotifier( args, function( err, data){
				callback(null, 1);
			} );
		}