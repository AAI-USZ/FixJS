function (methods) {
                // <debug>
                assert_arg(methods, "array", 1);
                // </debug>

                var i,
                    max = methods.length,
                    fn;

                for (i = 0; i < max; ++i) {
                    if(methods[i] != "__construct") {
                        fn = $self.prototype[methods[i]];
                        delete $self.prototype[methods[i]];

                        Object.defineProperty($self.prototype, methods[i], {
                            value: fn,
                            writable : false,
                            enumerable : false,
                            configurable : false
                        });
                    }
                }

                return this;
            }