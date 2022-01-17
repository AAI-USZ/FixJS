function projectInfo(i, d) {
						var name = $(d).attr('name');
						return {
							isNew : self.projects[name] ? false : true,
							name: name,
							status: $(d).attr('lastBuildStatus')
						}
					}