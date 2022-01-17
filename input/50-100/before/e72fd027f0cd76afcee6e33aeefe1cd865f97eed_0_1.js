function(err, res) {

					if (err) { next(err); } else {

						var finalResults = [];

						for(var i=0; i<res.length; i++) {

							finalResults[res[i].name] = res[i].result;

							finalResults.push(res[i].result);

						}

						if (hasMultipleTaskGroups) {

							results.push(finalResults);

						} else {

							results = finalResults;

						}

						next();

					}

				}