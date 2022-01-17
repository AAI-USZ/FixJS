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
            }),
                Singleton2 = Class({
                    foo: null,
                    __initialize: function () {
                        this.foo = 'bar';
                    },

                    $statics: {
                        getInstance: function () {
                            return new Singleton2();
                        }
                    }
                }),
                SubSingleton = Class({
                    $extends: Singleton
                }),
                SubSingleton2 = Class({
                    $extends: Singleton2
                }),
                OtherSubSingleton = Class({
                    $extends: SubSingleton,
                    $statics: {
                        getInstance: function () {
                            return new OtherSubSingleton();
                        }
                    }
                }),
                OtherSubSingleton2 = Class({
                    $extends: SubSingleton2,
                    $statics: {
                        getInstance: function () {
                            return new OtherSubSingleton2();
                        }
                    }
                });

            it('should be accomplished with protected constructors', function () {

                expect(function () {
                    return Singleton.getInstance();
                }).to.not.throwException();

                expect(function () {
                    return SubSingleton2.getInstance();
                }).to.not.throwException();

                expect(function () {
                    return OtherSubSingleton.getInstance();
                }).to.not.throwException();

            });

            it('should be accomplished with private constructors', function () {

                expect(function () {
                    return Singleton2.getInstance();
                }).to.not.throwException();

                expect(function () {
                    return SubSingleton2.getInstance();
                }).to.not.throwException();

                expect(function () {
                    return OtherSubSingleton2.getInstance();
                }).to.not.throwException();

            });

        }