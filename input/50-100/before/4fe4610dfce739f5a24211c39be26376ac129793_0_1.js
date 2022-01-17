function () {
				projectView.show(json);

				var state = projectView.get();

				expect(state.projects.length).toBe(2);
				expect(state.projects[0]).toBe('CruiseControl.NET');
				expect(state.projects[1]).toBe('Project3-1');
			}