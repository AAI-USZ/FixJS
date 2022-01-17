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


            it('should skip handlers that throw errors', function () {

                emitter.addListener('click', listener1);
                emitter.addListener('click', listener2);
                emitter.addListener('click', listener3);

                emitter.fireEvent('click');

                expect(stack).to.eql(['listener1', 'listener3']);

            });

        }