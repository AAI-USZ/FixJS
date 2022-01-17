function () {
			var reqData,
				value,
				callback,
				listenRes = '{"total_rows":3,"offset":0,"rows":[' +
					'{"id":"document1","key":"2012/01/13 12:45:56","value":{"date":"2012/01/13 12:45:56","title":"my first document","body":"in this database"}},' +
					'{"id":"document2","key":"2012/01/13 13:45:21","value":{"date":"2012/01/13 13:45:21","title":"this is a new document","body":"in the database"}},' +
					'{"id":"document3","key":"2012/01/13 21:45:12","value":{"date":"2012/01/13 21:45:12","title":"the 3rd document","body":"a change for the example"}}]}';                                                                                   	            
			
			spyOn(couchDBStore, "set");
			
			couchDBStore.actions.updateDocInStore.call(couchDBStore, "document3");
			expect(transportMock.request.wasCalled).toEqual(true);
			expect(transportMock.request.mostRecentCall.args[0]).toEqual("CouchDB");

			reqData = transportMock.request.mostRecentCall.args[1];
			expect(reqData["method"]).toEqual("GET");
			expect(reqData["path"]).toEqual("/db/_design/design/_view/view");
			expect(reqData["query"]).toBe(query);
			
			callback = transportMock.request.mostRecentCall.args[2];
			expect(callback).toBeInstanceOf(Function);
			callback.call(couchDBStore, listenRes);
			
			expect(couchDBStore.set.wasCalled).toEqual(true);
			expect(couchDBStore.set.mostRecentCall.args[0]).toEqual(2);
			value = couchDBStore.set.mostRecentCall.args[1];
			
			expect(value.value.body).toEqual("a change for the example");
			
		}