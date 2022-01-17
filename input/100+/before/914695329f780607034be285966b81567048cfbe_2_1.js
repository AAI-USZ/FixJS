function() {
				var model = new BtappModel({'id':'test'});
				model.updateState('testsession', {'testkey':'testvalue'}, null, 'testurl');
				var remove_callback = jasmine.createSpy();
				model.bind('remove', remove_callback);
				model.updateState('testsession', null, {'testkey':'testvalue'}, 'testurl');
				expect(remove_callback).toHaveBeenCalledWith('testvalue');
				model.unbind('remove', remove_callback);
				expect(remove_callback.callCount).toEqual(1);
			}