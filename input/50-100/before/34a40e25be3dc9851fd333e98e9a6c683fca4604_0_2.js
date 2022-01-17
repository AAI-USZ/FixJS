function () {
			var fixedProject,
				buildFixedSpy = spyOnSignal(service.buildFixed).matching(function (info) {
					return info.message === 'Build fixed - CruiseControl.NET';
				});
			initResponse();
			service.update();
			fixedProject = service.projects['CruiseControl.NET'];

			fixedProject.buildFixed.dispatch(fixedProject);

			expect(buildFixedSpy).toHaveBeenDispatched(1);
		}