function () {

            var Singleton = Class({
                foo: null,
                _initialize: function () {
                    this.foo = 'bar';
                },

                $statics: {
                    getInstance: function () {
                        return new Singleton();
                    }
                }
            });

            it('should be accomplished with protected constructors', function () {

                expect(function () {
                    return Singleton.getInstance();
                }).to.throwException(/wtf/);

            });

        }