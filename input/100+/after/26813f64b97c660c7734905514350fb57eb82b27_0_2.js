function() {
		var ev = eventsService.createWebinosEvent("testtype", {to: [{id: "to"}], source: {id: "from"}});
		expect(ev).toHaveProp("type");
		expect(ev).toHaveProp("addressing");
		expect(ev).toHaveProp("id");
		expect(ev).toHaveProp("timeStamp");
		expect(ev.dispatchWebinosEvent).toEqual(jasmine.any(Function));
		expect(ev.forwardWebinosEvent).toEqual(jasmine.any(Function));
	}