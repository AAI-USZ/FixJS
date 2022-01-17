function projectInfo(i, d) {
						var name = $(d).attr('name');
						return {
							name: name,
							status: $(d).attr('lastBuildStatus')
						};
					}