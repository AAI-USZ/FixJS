function fetchGenes(partial,req, res) {
	var data = new Array();
	//console.log(res);
	console.log("using " + partial) ;
	var query = "SELECT known_gene_symbol FROM genes WHERE genes.known_gene_symbol LIKE $partial";
	db.all(query, { $partial: partial + '%'}, function(err, rows) {  
		if (err) {
	 		throw err;
		}
	    	console.log("Found matches: " + size(rows));
		for (i = 0; i < rows.length; i++) {
			//console.log(rows[i].known_gene_symbol);
			data.push(rows[i].known_gene_symbol);
		}
	json_fmt  = JSON.stringify(data);
	console.log(json_fmt);
	res.send(json_fmt);	});

}