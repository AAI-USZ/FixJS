function() {
            var test = this,
                Assert = Y.Assert,
                ArrayAssert = Y.ArrayAssert;

            YUI({
                filter: 'raw',
                groups: {
                    skins: {
                        base: resolvePath('./assets/'),
                        modules: {
                            'skin-test': {
                                skinnable: true
                            }
                        }
                    }
                },
                skin: {
                    overrides:{
                        'skin-test': ['green']
                    }
                }
            }).use('skin-test', function(Y, status) {
                test.resume(function() {
                    var modules = status.data.sort();
                    Assert.isTrue(Y.SKIN_TEST, 'Failed to load external module');
                    ArrayAssert.itemsAreEqual(["skin-green-skin-test", "skin-test"], modules, 'Failed to load all modules');
                });
            });

            test.wait();
        }