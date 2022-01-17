function() {
				var model = new BtappModel({'id':'test'});
				var add_callback = jasmine.createSpy();
				model.bind('add', add_callback);
				model.updateState('testsession', {'testkey':'testvalue'}, null, 'testurl');
				expect(add_callback).toHaveBeenCalledWith('testvalue', 'testkey');
				model.unbind('add', add_callback);
				expect(add_callback.callCount).toEqual(1);
			}