function(tableName, callback){
	var whereClause = buildWhereClause(this.whereObject);
	var whereData = buildWhereClause(this.whereObject);
	
	var selectQuery = buildSelectQuery({
		tableName: tableName,
		distinctClause: this.distinctClause,
		selectClause: this.selectClause,
		joinClause: this.joinClause,
		whereClause: whereData.clause,
		orderByClause: buildOrderByClause(this.orderByObject),
		limitClause: this.limitObject.clause
	});
	
	var conn = this.connection;
	console.log(selectQuery);
	conn.query("PREPARE statement FROM \'"+selectQuery+"\'");
	
	setParamsObject = new setStatementParams(conn);
	
	if (whereData.params.length>0){
		setParamsObject.setParams(whereData.params);
	}
	
	if (this.limitObject.params.length>0){
		setParamsObject.setParams(this.limitObject.params);
	}
	var usingClause = setStatementParams.setUsingClause();
	
	conn.query("EXECUTE statement"+usingClause, callback);
	conn.query("DEALLOCATE PREPARE statement");
	
	this.flush(selectQuery);
}