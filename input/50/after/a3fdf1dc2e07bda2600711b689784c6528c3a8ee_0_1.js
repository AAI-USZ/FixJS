function() {
                    var modules = status.data.sort();
                    Assert.isTrue(Y.SKIN_TEST, 'Failed to load external module');
                    ArrayAssert.itemsAreEqual(["skin-green-skin-test", "skin-test"], modules, 'Failed to load all modules');
                }