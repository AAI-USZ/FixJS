function(params){
	for (var i in params){
		this.indexCode++;
		// 122 = z
		if (this.indexCode>122)
			throw new Error("tarps.get(): Number of allowed prepare statement params has been exceeded. This restriction will be removed in future versions.");
		this.conn.query("SET @"+String.fromCharCode(this.indexCode)+" = \""+params[i]+"\"");
	}
}