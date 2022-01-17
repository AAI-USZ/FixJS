function () {
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

		}