function () {

		var transport = null,
		socket = null;

		beforeEach(function () {
			transport = new Transport(io, "/");
			socket = transport.getSocket();
		});

		it("should subscribe to events", function () {
			var event = "event",
			func = function () {};

			transport.on(event, func);

			expect(socket.on.wasCalled).toEqual(true);
			expect(socket.on.mostRecentCall.args[0]).toEqual(event);
			expect(socket.on.mostRecentCall.args[1]).toEqual(func);

		});

		it("should subscribe to events and disconnect after it fires", function () {
			var event = "event",
			func = function () {};

			expect(transport.once).toBeInstanceOf(Function);

			transport.once(event, func);

			expect(socket.once.wasCalled).toEqual(true);
			expect(socket.once.mostRecentCall.args[0]).toEqual(event);
			expect(socket.once.mostRecentCall.args[1]).toEqual(func);
		});

		it("should emit events", function () {
			var	event = "event",
			data = {},
			callback = function () {};

			transport.emit(event, data, callback);

			expect(socket.emit.wasCalled).toEqual(true);
			expect(socket.emit.mostRecentCall.args[0]).toEqual(event);
			expect(socket.emit.mostRecentCall.args[1]).toEqual(data);
			expect(socket.emit.mostRecentCall.args[2]).toBe(callback);
		});

		it("should make requests", function () {
			var channel = "File",
			requestData = {
					resource: "image.jpg"
			},
			callback = jasmine.createSpy(),
			eventId;


			socket.once = function (id, func) {
				func();
			};
			spyOn(socket, "once").andCallThrough();

			expect(transport.request).toBeInstanceOf(Function);

			transport.request(channel, requestData, callback);

			expect(socket.once.wasCalled).toEqual(true);

			eventId = socket.once.mostRecentCall.args[0];
			expect(eventId).toBeTruthy();

			expect(socket.once.mostRecentCall.args[1]).toBeInstanceOf(Function);
			expect(callback.wasCalled).toEqual(true);
			expect(socket.emit.wasCalled).toEqual(true);
			expect(socket.emit.mostRecentCall.args[0]).toEqual(channel);
			expect(socket.emit.mostRecentCall.args[1]).toBeInstanceOf(Object);
			expect(socket.emit.mostRecentCall.args[1].__eventId__).toEqual(eventId);
		});

		it("should not fail if a request is made without callback function", function () {
			var channel = "File",
			requestData = {
					resource: "image.jpg"
			};

			socket.once = function (id, func) {
				func();
			};
			expect(function () {
				transport.request(channel, requestData);
			}).not.toThrow();
		});

		it("should make requests in scope", function () {
			var channel = "File",
			requestData = {
					resource: "image.jpg"
			},
			callback = jasmine.createSpy(),
			thisObj = {};

			socket.once = function (id, func) {
				func();
			};
			spyOn(socket, "once").andCallThrough();
			transport.request(channel, requestData, callback, thisObj);
			expect(callback.wasCalled).toEqual(true);
		});

		it("should also listen on a kept-alive socket", function () {
			var channel = "File",
			url = "image.jpg",
			callback = jasmine.createSpy(),
			listen,
			eventId;

			socket.on = function (id, func) {
				func();
			};
			spyOn(socket, "on").andCallThrough();

			expect(transport.listen).toBeInstanceOf(Function);

			spyOn(transport, "request").andCallThrough();
			stop = transport.listen(channel, {path: url}, callback);

			expect(stop).toBeInstanceOf(Function);

			expect(socket.on.wasCalled).toEqual(true);

			eventId = socket.on.mostRecentCall.args[0];
			expect(eventId).toBeTruthy();
			
			stop();

			expect(socket.emit.mostRecentCall.args[0]).toEqual("disconnect-" + eventId);
			expect(socket.removeListener.mostRecentCall.args[0]).toEqual(eventId);
			expect(socket.removeListener.mostRecentCall.args[1]).toBeInstanceOf(Function);
			expect(transport.request.wasCalled).toEqual(true);
			expect(transport.request.mostRecentCall.args[1].__keepalive__).toEqual(true);
			expect(transport.request.mostRecentCall.args[1].method).toEqual("GET");
			expect(transport.request.mostRecentCall.args[1].path).toEqual(url);

		});
		
		it("should save the function to stop listening (the request's return) in an object", function () {
			expect(transport.getStopFunctions).toBeInstanceOf(Function);
			expect(transport.getStopFunctions()).toBeInstanceOf(Object);
		});
		
		it("should allow for multiple listeners on the same url", function () {
			var channel = "DB",
				url = "changes",
				callback1 = jasmine.createSpy(),
				callback2 = jasmine.createSpy(),
				stop = jasmine.createSpy(),
				observable,
				stops,
				stop1,
				stop2;
			
			observable = transport.getListenObservable();
			spyOn(observable, "unwatch").andCallThrough();
			spyOn(transport, "request").andReturn(stop);
				
			stop1 = transport.listen(channel, {path: url}, callback1);
			stop2 = transport.listen(channel, {path: url}, callback2);
			
			stops = transport.getStopFunctions();
			
			expect(stops["DB/changes"]).toBe(stop);

			observable.notify("DB/changes", "called");
			
			expect(callback1.wasCalled).toEqual(true);
			expect(callback1.mostRecentCall.args[0]).toEqual("called");
			expect(callback2.wasCalled).toEqual(true);
			expect(callback2.mostRecentCall.args[0]).toEqual("called");
			
			stop1();
			stop2();
			
			expect(observable.unwatch.callCount).toEqual(2);
			expect(stop.callCount).toEqual(1);

		});

		it("should implement an observable for the listen func", function () {
			var channel = "DB",
				url = "changes",
				observable,
				listen;

			expect(transport.getListenObservable).toBeInstanceOf(Function);
			observable = transport.getListenObservable();
			expect(observable).toBeInstanceOf(Observable);

			spyOn(observable, "watch").andCallThrough();
			spyOn(observable, "unwatch").andCallThrough();
			stop = transport.listen(channel, {path: url}, function () {});
			expect(observable.watch.wasCalled).toEqual(true);
			expect(observable.watch.mostRecentCall.args[0]).toEqual(channel+"/"+url);

			stop();

			expect(observable.unwatch.wasCalled).toEqual(true);
			expect(observable.unwatch.mostRecentCall.args[0]).toBeInstanceOf(Array);

		});
		
		it("should let query strings pass", function () {
			var channel = "DB",
				reqData = {
					path: "/",
					query: {
						param1: true,
						hello: "world"
					}
				};
			
			spyOn(transport, "request");
			
			transport.listen(channel, reqData, function () {});
			expect(transport.request.mostRecentCall.args[1].query).toBe(reqData.query);
		});
			

		it("should listen to the same path only once", function () {
			var channel = "DB",
			url = "changes",
			callback = jasmine.createSpy();

			spyOn(transport, "request");

			transport.listen(channel, {path: url}, callback);
			transport.listen(channel, {path: url}, callback);
			expect(transport.request.callCount).toEqual(1);
			transport.listen(channel, {path: "otherpath"}, callback);
			expect(transport.request.callCount).toEqual(2);
		});

	}