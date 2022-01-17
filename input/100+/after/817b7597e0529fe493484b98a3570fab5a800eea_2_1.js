function () {

            var listener1 = function () {
                stack.push('listener1');
            },
                listener2 = function () {
                    throw new Error('Some dummy error.');
                },
                listener3 = function () {
                    stack.push('listener3');
                };

            before(function () {
                emitter = new EventsEmitter();
            });

            beforeEach(function () {
                stack = [];
                args = [];
            });

        }