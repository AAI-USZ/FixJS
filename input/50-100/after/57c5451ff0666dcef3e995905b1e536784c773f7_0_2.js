function(callback)
	{
		console.log("Dumping table...");
		this.db.transaction(function(tx){
			tx.executeSql('DELETE FROM subscriptions',[],function(){
				if(callback) callback();
			});
			tx.executeSql('DELETE FROM tags',[],function(){
				console.log("Tags Table destroyed successfully");
			});
		});
	}