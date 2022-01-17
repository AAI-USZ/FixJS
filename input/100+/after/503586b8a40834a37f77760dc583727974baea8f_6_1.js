function() {

    describe('getTechClass()', function() {

        var testTech = require.resolve(PATH.resolve(__dirname, 'data/techs/test-tech.js'));

        it('for path', function() {

            // tech class
            var T = getTechClass(testTech),

                // tech object
                o = new T('tech', 'tech');

            assert.isTrue(o.test);

        });

        it('for module object', function() {

            // tech class
            var T = getTechClass({ test: true }),

                // tech object
                o = new T('tech', 'tech');

            assert.isTrue(o.test);

        });

        it('for module with baseTechPath property', function() {

            // tech class
            var T = getTechClass({
                    baseTechPath: testTech,
                    test2: true
                }),

                // tech object
                o = new T('tech', 'tech');

            assert.isTrue(o.test);
            assert.isTrue(o.test2);

        });

        it('for module with baseTechName property', function() {

            // level mock with resolveTech() implementation only
            var level = {
                        resolveTech: function() {
                            return testTech;
                        }
                    },

                // tech class
                T = getTechClass({
                        baseTechName: 'base',
                        test2: true
                    }, level),

                // tech object
                o = new T('tech', 'tech');

            assert.isTrue(o.test);
            assert.isTrue(o.test2);

        });

        it('for module with baseTech property', function() {

            // tech class
            var T = getTechClass({
                        baseTech: getTechClass({ test: true }),
                        test2: true
                    }),

                // tech object
                o = new T('tech', 'tech');

            assert.isTrue(o.test);
            assert.isTrue(o.test2);

        });

        it('for module with techMixin property', function() {

            var T = getTechClass({
                        baseTech: getTechClass({ test: true }),
                        techMixin: {
                            test2: true
                        }
                    }),
                o = new T('tech', 'tech');

            assert.isTrue(o.test);
            assert.isTrue(o.test2);

        });

    });

}