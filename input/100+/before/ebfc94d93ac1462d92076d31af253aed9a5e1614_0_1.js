function () {
			var channel = "DB",
			url = "changes",
			callback = jasmine.createSpy();

			spyOn(transport, "request");

			transport.listen(channel, {path: url}, callback);
			transport.listen(channel, {path: url}, callback);
			expect(transport.request.callCount).toEqual(1);
			transport.listen(channel, {path: "otherpath"}, callback);
			expect(transport.request.callCount).toEqual(2);
		}