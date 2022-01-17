function(){
		/* Create the p3Reader database if it does not exist.*/
		this.db = openDatabase('p3reader',"1.0","Subscriptions Database",1024*200);
		/* Create the subscriptions table if it does not exist */
		this.db.transaction(function(tx){
			tx.executeSql('CREATE TABLE IF NOT EXISTS subscriptions(id text PRIMARY KEY, htmlUrl text, title text,label text,unreadCount integer,timestamp DATETIME)',[],function(){
							console.log("Table created successfully.");
						},function(e){
							console.log(e);
						});
		});

		/* Create the tags table if it does not exist */
		this.db.transaction(function(tx){
			tx.executeSql('CREATE TABLE IF NOT EXISTS tags(id text,item text PRIMARY KEY,tag text,timestamp DATETIME)',[],function(){
							console.log("Table created successfully.");
						},function(e){
							console.log(e);
						});
		});
	}