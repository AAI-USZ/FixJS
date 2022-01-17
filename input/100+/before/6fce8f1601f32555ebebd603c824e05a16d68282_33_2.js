function (response, selectedPlans) {
		    var projects = response.projects.project;
		    var items = [];
			for (var projectIndex = 0; projectIndex < projects.length; projectIndex++) {
				var project = projects[projectIndex];
				for (var planIndex = 0; planIndex < project.plans.plan.length; planIndex++) {
					var plan = project.plans.plan[planIndex];
					var item = {
					    id: plan.key,
						name: plan.shortName,
						group: project.name,
						enabled: plan.enabled,
						selected: selectedPlans.indexOf(plan.key) > -1
					};
					items.push(item);
				}
			}
			return {
			    items: items
			};;
		}