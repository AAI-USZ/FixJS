function(table, callback){
	table.sync().success(function(){
		callback(null, true);
	}).error(function(){
		callback(error, null);
	})
}