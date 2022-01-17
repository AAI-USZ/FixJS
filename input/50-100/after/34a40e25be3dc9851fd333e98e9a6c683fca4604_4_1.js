function projectInfo(i, d) {
						var name = $(d).attr('name');
						return {
							name: name,
							category: $(d).attr('category'),
							status: $(d).attr('lastBuildStatus')
						};
					}