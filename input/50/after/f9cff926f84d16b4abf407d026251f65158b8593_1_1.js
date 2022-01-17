function () {
                Assert.areSame('/hashpath', req.path);
                Assert.areSame(Y.getLocation().pathname, root + 'hashpath');
            }