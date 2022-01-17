function()
	{
		console.log("Dumping table...");
		this.db.transaction(function(tx){
			tx.executeSql('DROP TABLE subscriptions',[],function(){
				console.log("Subscriptions Table destroyed successfully");
			});
			tx.executeSql('DROP TABLE tags',[],function(){
				console.log("Tags Table destroyed successfully");
			});
		});
	}