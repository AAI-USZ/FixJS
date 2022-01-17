function() {
			this.dispatcher.subscribe("foo", this.subscriber);
			expect(this.dispatcher.subscribers.foo).toBeArray();
			expect(this.dispatcher.subscribers.foo.length).toEqual(1);
			expect(this.dispatcher.subscribers.foo[0].method).toEqual("handleEvent");
		}