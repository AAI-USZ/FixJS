function (serializer) {
					assert.isFunction(serializer.read);
					assert.isFunction(serializer.write);
				}