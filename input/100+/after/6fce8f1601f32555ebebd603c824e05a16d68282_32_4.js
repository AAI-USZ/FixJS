function initializeFrom(projectsResponse) {
				for (var i = 0; i < projectsResponse.projects.project.length; i++) {
					var responseProject = projectsResponse.projects.project[i];
					initializeFromProject(responseProject);
				}
			}