function () {
                var args = fn.mostRecentCall.args;
                expect(args.length).toEqual(4);
                expect(args[0]).toEqual(new Environment());
                expect(typeof args[1]).toEqual('function');
                expect(args[2]).toEqual(componentOpt.context);
                expect(args[3]).toEqual({session: 'data'});
            }