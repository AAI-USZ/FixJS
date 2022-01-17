function (issue, next) {

            reporterType != 'Base' && template.render('events/test-title', { type: type, url: issue.data.html_url });

            var suite = new mocha.Suite(type, new mocha.Context);

            for (var key in this.tests[type]) {

                var fn = this.tests[type][key];

                switch (key) {
                    case 'before':
                        suite.beforeAll(fn.bind(fn, issue.exports));
                        break;
                    case 'after':
                        suite.afterAll(fn.bind(fn, issue.exports));
                        break;
                    default:
                        suite.addTest(new mocha.Test(key, fn.bind(fn, issue.exports)));
                }

            }

            var runner   = new mocha.Runner(suite);
            var reporter = new mocha.reporters[reporterType](runner);

            issue.exports.reporter = reporter;

            runner.run(function () {
                if (reporter.stats.failures) {
                    total['failing-' + Repo.typeMap[type]]++;
                }
                next();
            });

        }