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
	
	var indexCode = 96; // 96 = a
	if (whereData.params.length>0){
		for (var i in whereData.params){
			indexCode++;
			// 122 = z
			if (indexCode>122)
				throw new Error("tarps.get(): Number of allowed prepare statement params has been exceeded. This restriction will be removed in future versions.");
			conn.query("SET @"+String.fromCharCode(indexCode)+" = \""+whereData.params[i]+"\"");
		}
	}
	
	if (this.limitObject.params.length>0){
		for (var i in this.limitObject.params){
			indexCode++;
			if (indexCode>122)
				throw new Error("tarps.get(): Number of allowed prepare statement params has been exceeded. This restriction will be removed in future versions.");
			conn.query("SET @"+String.fromCharCode(indexCode)+" = \""+this.limitObject.params[i]+"\"");
		}
	}
	
	if (indexCode>96){
		var usedIndexes = [];
		for (var i=97;i<=indexCode;i++){
			usedIndexes.push("@"+String.fromCharCode(i));
		}	
	}
	var usingClause = (indexCode>96?" USING "+usedIndexes.join():"");
	
	conn.query("EXECUTE statement"+usingClause, callback);
	conn.query("DEALLOCATE PREPARE statement");
	
}