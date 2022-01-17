function() {
		expect(eventsService).toHaveProp("state");
		expect(eventsService).toHaveProp("api");
		expect(eventsService.api).toEqual(jasmine.any(String));
		expect(eventsService).toHaveProp("id");
		expect(eventsService.id).toEqual(jasmine.any(String));
		expect(eventsService).toHaveProp("displayName");
		expect(eventsService.displayName).toEqual(jasmine.any(String));
		expect(eventsService).toHaveProp("description");
		expect(eventsService.description).toEqual(jasmine.any(String));
		expect(eventsService).toHaveProp("icon");
		expect(eventsService.icon).toEqual(jasmine.any(String));
		expect(eventsService).toHaveProp("bindService");
		expect(eventsService.bindService).toEqual(jasmine.any(Function));
	}