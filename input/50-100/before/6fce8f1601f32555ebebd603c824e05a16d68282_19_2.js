function () {
				var spyJQuery = spyOn(jQuery, 'attr');
				var mockSettings1 = new MockSettingsBuilder().create();
				var mockSettings2 = new MockSettingsBuilder().create();

				frame.show(mockSettings1);
				frame.show(mockSettings2);

				expect(spyJQuery.callCount).toBe(2);
			}