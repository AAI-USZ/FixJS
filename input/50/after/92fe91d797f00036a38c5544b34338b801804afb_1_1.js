function() {
			expect(function() {
				BaseModel.extendModule("__NON_EXISTENT_MODULE__", {});
			}).toThrowError();
		}