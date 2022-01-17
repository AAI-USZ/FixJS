function () {
			var failedProject,
				buildFailedSpy = spyOnSignal(service.buildFailed).matching(function (info) {
					return info.message === 'Build failed - CruiseControl.NET';
				});
			initResponse();
			service.update();
			failedProject = service.projects['CruiseControl.NET'];

			failedProject.buildFailed.dispatch(failedProject);

			expect(buildFailedSpy).toHaveBeenDispatched(1);
		}