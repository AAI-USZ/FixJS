function() {
    resetGlobals();
    g_builders['WebKit Win'] = true;
    g_resultsByBuilder = {
        'WebKit Win': {
            'tests': {
                'foo/test1.html': {'results': [[100, 'F']], 'times': [[100, 0]]},
                'foo/test3.html': {'results': [[100, 'F']], 'times': [[100, 0]]},
                'test1.html': {'results': [[100, 'F']], 'times': [[100, 0]]}
            }
        }
    }

    g_expectations = 'BUG123 : foo = FAIL PASS CRASH\n' +
        'RELEASE BUGFOO : foo/test1.html = FAIL\n' +
        'DEBUG : foo/test1.html = CRASH\n' +
        'BUG456 : foo/test2.html = FAIL\n' +
        'LINUX DEBUG : foo/test2.html = CRASH\n' +
        'RELEASE : test1.html = FAIL\n' +
        'DEBUG : test1.html = CRASH\n' +
        'WIN7 : http/tests/appcache/interrupted-update.html = TIMEOUT\n' +
        'MAC LINUX XP : http/tests/appcache/interrupted-update.html = FAIL\n';

    processExpectations();
    
    var expectations = getExpectations('foo/test1.html', 'XP', 'DEBUG');
    equal(JSON.stringify(expectations), '{"modifiers":"DEBUG","expectations":"CRASH"}');

    var expectations = getExpectations('foo/test1.html', 'LUCID', 'RELEASE');
    equal(JSON.stringify(expectations), '{"modifiers":"RELEASE BUGFOO","expectations":"FAIL"}');

    var expectations = getExpectations('foo/test2.html', 'LUCID', 'RELEASE');
    equal(JSON.stringify(expectations), '{"modifiers":"BUG456","expectations":"FAIL"}');

    var expectations = getExpectations('foo/test2.html', 'LION', 'DEBUG');
    equal(JSON.stringify(expectations), '{"modifiers":"BUG456","expectations":"FAIL"}');

    var expectations = getExpectations('foo/test2.html', 'LUCID', 'DEBUG');
    equal(JSON.stringify(expectations), '{"modifiers":"LINUX DEBUG","expectations":"CRASH"}');

    var expectations = getExpectations('foo/test3.html', 'LUCID', 'DEBUG');
    equal(JSON.stringify(expectations), '{"modifiers":"BUG123","expectations":"FAIL PASS CRASH"}');

    var expectations = getExpectations('test1.html', 'XP', 'DEBUG');
    equal(JSON.stringify(expectations), '{"modifiers":"DEBUG","expectations":"CRASH"}');

    var expectations = getExpectations('test1.html', 'LUCID', 'RELEASE');
    equal(JSON.stringify(expectations), '{"modifiers":"RELEASE","expectations":"FAIL"}');

    var expectations = getExpectations('http/tests/appcache/interrupted-update.html', 'WIN7', 'RELEASE');
    equal(JSON.stringify(expectations), '{"modifiers":"WIN7","expectations":"TIMEOUT"}');

    var expectations = getExpectations('http/tests/appcache/interrupted-update.html', 'LION', 'RELEASE');
    equal(JSON.stringify(expectations), '{"modifiers":"MAC LINUX XP","expectations":"FAIL"}');

    var expectations = getExpectations('http/tests/appcache/interrupted-update.html', 'LUCID', 'RELEASE');
    equal(JSON.stringify(expectations), '{"modifiers":"MAC LINUX XP","expectations":"FAIL"}');
}