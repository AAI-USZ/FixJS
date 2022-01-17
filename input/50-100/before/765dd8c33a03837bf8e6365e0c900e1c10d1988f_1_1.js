function() {
			this.dispatcher.subscribe("foo", {}, "handleFoo");
			this.dispatcher.subscribe("foo", {}, "handleFoo");
			expect(this.dispatcher.subscribers.foo).toBeArray();
			expect(this.dispatcher.subscribers.foo.length).toEqual(2);
		}