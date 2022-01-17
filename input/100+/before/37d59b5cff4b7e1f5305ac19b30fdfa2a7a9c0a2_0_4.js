function clearOrdersQuery(tx) {

	var query="DELETE FROM Orders";	

	tx.executeSql(query);

}