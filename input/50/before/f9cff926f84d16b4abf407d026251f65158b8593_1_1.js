function () {
                Assert.areSame('/hashpath', req.path);
                Assert.areSame(Y.config.win.location.pathname, root + 'hashpath');
            }