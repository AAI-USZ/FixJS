function () {
			var fixedProject,
				buildFixedSpy = spyOnSignal(service.buildFixed).matching(function (info) {
					return info.buildName === 'NetReflector' &&
						info.group === 'CruiseControl.NET';
				});
			initResponse();
			service.update();
			fixedProject = service.projects['NetReflector'];

			fixedProject.buildFixed.dispatch(fixedProject);

			expect(buildFixedSpy).toHaveBeenDispatched(1);
		}