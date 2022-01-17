function findAllExpression(symbol) { //find all expression levels for a given gene id
	db.serialize(function() {
	 var query = "SELECT regions.brodmann_code, samples.mean_expression_level FROM genes, samples, regions \
	 			WHERE genes.id = samples.gene_id  	AND regions.id = samples.region_id \
	 			AND genes.known_gene_symbol = $symbol AND genes.chip_id = $chip AND samples.experiment_id = $exp";
	 db.all(query, { $symbol: symbol, $chip: 28, $exp: 1}, function(err, row) {  //platform HU 133
	 	if (err) {
	 		throw err;
		}
	 	console.log(row);//row.brodmann_code + " - " + row.mean_expression_level);
	});	
	});
	db.close();
}