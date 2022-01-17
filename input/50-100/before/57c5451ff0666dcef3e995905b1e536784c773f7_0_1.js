function(feedId,callback)
	{
		console.log("Removing subscriptions..." + url);
		this.db.transaction(function(tx){
			tx.executeSql("DELETE FROM subscriptions WHERE id = ?",[feedId],function(tx,r){
					console.log("Successfully removed : " + feedId);
					callback();
				},function(tx, e){
					console.log("Error deleting subscriptions : " + e);
				});
		});
	}