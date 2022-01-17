function(results){
				if (results && results.length){
					res.json({ data: es_result.hits.map(function(hit){
						// reorder to es sort
						var id = hit['_id'];
						for (var i = 0; i < results.length; i++ ){
							if (id == results[i].id){
								results[i].compatibility = JSON.parse(results[i].compatibility);
								results[i].category = results[i].category.split(',');
								results[i].images = results[i].images.split(',');
								results[i].versions = hit['_source'].versions;
								return results[i];
							}
						}
					})}, 200);
				} else {
					console.log("error finding IDs in db", ids);
					res.json({ data: [], }, 200);
				}	

			}