function () {
				projectView.show(json);

				var state = projectView.get();

				expect(state.projects.length).toBe(2);
				expect(state.projects[0]).toBe(0);
				expect(state.projects[1]).toBe(4);
			}