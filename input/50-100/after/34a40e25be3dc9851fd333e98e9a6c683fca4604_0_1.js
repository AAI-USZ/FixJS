function () {
			var failedProject,
				buildFailedSpy = spyOnSignal(service.buildFailed).matching(function (info) {
					return info.buildName === 'NetReflector' &&
						info.group === 'CruiseControl.NET';
				});
			initResponse();
			service.update();
			failedProject = service.projects['NetReflector'];

			failedProject.buildFailed.dispatch(failedProject);

			expect(buildFailedSpy).toHaveBeenDispatched(1);
		}