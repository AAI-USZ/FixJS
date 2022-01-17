function (t){
		t.executeSql("CREATE TABLE IF NOT EXISTS toSendQueue (id INTEGER PRIMARY KEY AUTOINCREMENT, category varchar(100), country varchar(3), location varchar(100), interest varchar(100), reason varchar(100), isp varchar(255), url varchar(4000),  accessible boolean, comment varchar(2000))",
		[],
		function (t, r){

		}, 
		function (t, e){
			alert(e.message);
		});
	}