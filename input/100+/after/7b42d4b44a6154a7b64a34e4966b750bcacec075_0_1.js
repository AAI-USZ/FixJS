function() {
        assertTrue(!document.getElementById('results-table'));

        var testLinks = document.querySelectorAll('.test-link');
        assertTrue(testLinks[0].innerText == 'foo/expected-to-pass-or-crash-and-crashed.html');
        assertTrue(enclosingNodeWithTagNameHasClassName(testLinks[0], 'tbody', 'expected'));
        assertTrue(enclosingNodeWithTagNameHasClassName(testLinks[0], 'div', 'expected'));

        assertTrue(testLinks[1].innerText == 'foo/expected-to-pass-or-timeout-and-timeouted.html');
        assertTrue(enclosingNodeWithTagNameHasClassName(testLinks[1], 'tbody', 'expected'));
        assertTrue(enclosingNodeWithTagNameHasClassName(testLinks[1], 'div', 'expected'));

        assertTrue(testLinks[2].innerText == 'foo/expected-pass-or-fail-and-passed.html');
        assertTrue(enclosingNodeWithTagNameHasClassName(testLinks[2], 'tbody', 'expected'));
        assertTrue(enclosingNodeWithTagNameHasClassName(testLinks[2], 'div', 'expected'));
    }