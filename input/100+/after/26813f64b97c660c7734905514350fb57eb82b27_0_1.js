function() {
		expect(eventsService).toHaveProp("state");
		expect(eventsService.api).toEqual(jasmine.any(String));
		expect(eventsService.id).toEqual(jasmine.any(String));
		expect(eventsService.displayName).toEqual(jasmine.any(String));
		expect(eventsService.description).toEqual(jasmine.any(String));
		expect(eventsService.icon).toEqual(jasmine.any(String));
		expect(eventsService.bindService).toEqual(jasmine.any(Function));
	}