function() {
            var callback1 = function() {};
            var callback2 = function() {};

            mediator.subscribe(TEST_CHANNEL, callback1, this);
            mediator.subscribe(TEST_CHANNEL, callback2, this);

            expect(channels[TEST_CHANNEL]).toContain(callback1, callback2);
        }