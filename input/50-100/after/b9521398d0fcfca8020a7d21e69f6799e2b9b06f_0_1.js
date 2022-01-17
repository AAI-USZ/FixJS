function(c){ // clauses
	return "SELECT"
		+c.distinctClause
		+" "+(c.selectClause==""? "*":c.selectClause)
		+" FROM "+c.tableName
		+c.joinClause
		+c.whereClause
		+c.orderByClause
		+c.limitClause
		;
}