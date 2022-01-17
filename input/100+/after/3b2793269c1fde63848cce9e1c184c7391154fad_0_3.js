function(err, es_result, raw){
		console.log("ES search response", err, es_result, raw);
		if (es_result && es_result.hits && es_result.hits.length){
			var ids = es_result.hits.map(function(h){ return h['_id']; });
			var query = "SELECT e.id, e.name, e.tag_name, e.url, e.category, " +
				"e.images, e.compatibility, e.demo_url, e.version, " + 
				"e.description, r.repo, r.title as repo_name, r.author FROM XTagElements e " +
				"JOIN XTagRepoes r ON e.`XTagRepoId` = r.id " +
				"WHERE e.id IN (" + ids.join(',')  + ")";		
			sequelize.query(query, {}, {raw: true}).success(function(results){
				if (results && results.length){
					res.json({ data: ids.map(function(id){
						// reorder to es sort
						for (var i = 0; i < results.length; i++ ){
							if (id == results[i].id){
								results[i].compatibility = JSON.parse(results[i].compatibility);
								results[i].category = results[i].category.split(',');
								results[i].images = results[i].images.split(',');
								return results[i];
							}
						}
					})}, 200);
				} else {
					console.log("error finding IDs in db", ids);
					res.json({ data: [], }, 200);
				}	

			}).failure(function(err){
				res.json({ error:err }, 400);
			});
		} else {
			res.json({ data: []}, 200);
		}
	}