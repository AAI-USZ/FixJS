function(tx){
			tx.executeSql("DELETE FROM subscriptions WHERE id = ?",[feedId],function(tx,r){
					console.log("Successfully removed : " + feedId);
					callback();
				},function(tx, e){
					console.log("Error deleting subscriptions : " + e);
				});
		}