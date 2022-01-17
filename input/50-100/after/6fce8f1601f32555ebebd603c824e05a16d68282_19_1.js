function () {
				var spyJQuery = spyOn($, 'attr');
				var mockSettings = new MockSettingsBuilder().create();

				frame.show(mockSettings);
				frame.show(mockSettings);

				expect(spyJQuery.callCount).toBe(1);
			}