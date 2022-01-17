function(Y, status) {
        var log, testConsole,
            renderLogger = function() {
                if (!log) {
                    log = Y.Node.create('<div id="logger" class="yui3-skin-sam"/>');
                    Y.one('body').prepend(log);
                    testConsole = (new Y.Test.Console()).render('#logger');
                    testConsole.collapse();
                    if (!auto && !showConsole) {
                        testConsole.hide();
                    }
                }
        };

        renderLogger();
        
        Y.Test.Case.prototype._poll = function(condition, period, timeout, success, failure, startTime) {

            var currentTime = (new Date()).getTime(),
                test = this;

            if (startTime === undefined) {
                startTime = currentTime;
            }

            if ((currentTime + period) - startTime < timeout) {
                Y.later(period, null, function() {
                    if (condition()) {
                        test.resume(success);
                    } else {
                        test._poll(condition, period, timeout, success, failure, startTime);
                    }
                });
            } else if (failure) {
                test.resume(failure);
            }
        };

        Y.Test.Case.prototype.poll = function(condition, period, timeout, success, failure) {
            this._poll(condition, period, timeout, success, failure);
            this.wait(timeout + 1000);
        };

        if (filter || showConsole) {
            Y.all('a').each(function(item) {
                var url = item.getAttribute('href');
                if (url.indexOf('#') === -1) {
                    var f = [];
                    if (filter) {
                        f.push('filter=' + filter);
                    }
                    if (showConsole) {
                        f.push('console=' + showConsole);
                    }
                    item.set('href', url + '?' + f.join('&'));
                }
            });
        }


        var counter = 0,
        count = function() {
            counter++;
        },
        testCase = new Y.Test.Case({
            name: 'Checking for load failure',
            'automated test script loaded': function() {
                Y.Assert.isTrue(status.success, 'Automated script 404ed');
            },
            'window.onerror called': function() {
                Y.Assert.isUndefined(YUI.Env.windowError, 'window.onerror fired');
            },
            'check for automated Y.TestCase': function() {
                Y.Assert.isTrue(Y.Test.Runner.masterSuite.items.length > 1, 'Automated script does not contain a Y.Test.Case');
            },
            'check for tests': function() {
                var num = Y.Object.keys(this).length - 3; //name, _should & this test
                if (num === counter) {
                    Y.Assert.fail('Automated script contains no tests');
                }
                Y.Assert.pass('All Good');
            }
        });

        Y.Test.Runner.on('pass', count);
        Y.Test.Runner.on('fail', count);
        Y.Test.Runner.on('ignored', count);

        Y.Test.Runner.add(testCase);
        
        Y.Test.Runner._ignoreEmpty = false; //Throw on no assertions
        Y.Test.Runner.setName(title);
        Y.Test.Runner.on('complete', function(e) {
            
            if (e.results.failed) {
                testConsole.show();
            }

            if (log) {
                var header = log.one('.yui3-console-hd h4');

                if (e.results.failed) {
                    log.addClass('failed');
                    header.setHTML(e.results.failed + ' tests failed!');
                    testConsole.expand();
                } else {
                    header.setHTML('All tests passed!');
                    log.addClass('passed');
                }
            }
        });
        Y.Test.Runner.run();
    }