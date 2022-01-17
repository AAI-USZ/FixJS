function() {
			var module = {
				prototype: {
					overrideMe: function() {
						return '123';
					}
				}
			};
			var extension = {
				prototype: {
					overrideMe: function() {
						return 'abc';
					}
				}
			};
			BaseModel.includeModule("__TEST5__", module);
			BaseModel.extendModule("__TEST5__", true, extension);
			expect(BaseModel.prototype.overrideMe).toEqual(extension.prototype.overrideMe);
			expect(BaseModel.prototype.overrideMe()).toEqual("abc");
		}