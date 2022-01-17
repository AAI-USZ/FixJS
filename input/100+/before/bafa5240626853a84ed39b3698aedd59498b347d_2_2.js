function () {
			var reqData,
				value,
				callback,
				listenRes = '{"total_rows":4,"offset":0,"rows":[' +
					'{"id":"document1","key":"2012/01/13 12:45:56","value":{"date":"2012/01/13 12:45:56","title":"my first document","body":"in this database"}},' +
					'{"id":"document2","key":"2012/01/13 13:45:21","value":{"date":"2012/01/13 13:45:21","title":"this is a new document","body":"in the database"}},' +
					'{"id":"document3","key":"2012/01/13 21:45:12","value":{"date":"2012/01/13 21:45:12","title":"the 3rd document","body":"a change for the example"}},' +
					'{"id":"document4","key":"2012/01/13 23:37:12","value":{"date":"2012/01/13 23:37:12","title":"the 4th\'s just been added","body":"do you see me?"}}]}';                                                                                   	            
			
			spyOn(couchDBStore, "alter");
			
			couchDBStore.actions.addDocInStore.call(couchDBStore, "document4");
			expect(transportMock.request.wasCalled).toEqual(true);
			expect(transportMock.request.mostRecentCall.args[0]).toEqual("CouchDB");
	
			reqData = transportMock.request.mostRecentCall.args[1];
			expect(reqData["method"]).toEqual("GET");
			expect(reqData["path"]).toEqual("/db/_design/design/_view/view");
			expect(reqData["query"]).toBe(query);
		
			callback = transportMock.request.mostRecentCall.args[2];
			expect(callback).toBeInstanceOf(Function);
			callback.call(couchDBStore, listenRes);
			
			expect(couchDBStore.alter.wasCalled).toEqual(true);
			expect(couchDBStore.alter.mostRecentCall.args[0]).toEqual("splice");
			expect(couchDBStore.alter.mostRecentCall.args[1]).toEqual(3);
			expect(couchDBStore.alter.mostRecentCall.args[2]).toEqual(0);
			value = couchDBStore.alter.mostRecentCall.args[3];
			
			expect(value.value.body).toEqual("do you see me?");
		}