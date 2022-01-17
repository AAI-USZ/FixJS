function() {
        var titles = document.getElementsByTagName('h1');
        assertTrue(titles[0].textContent == 'Tests that crashed (1):');
        assertTrue(titles[1].textContent == 'Tests where results did not match expected results (3):');
        assertTrue(titles[2].textContent == 'Tests that had no expected results (probably new) (1):');
        assertTrue(titles[3].textContent == 'Tests that timed out (0):');
        assertTrue(titles[4].textContent == 'Tests that had stderr output (1):');
        assertTrue(titles[5].textContent == 'Tests expected to fail but passed (1):');

        document.getElementById('unexpected-results').checked = false;
        document.getElementById('unexpected-results').onchange();

        assertTrue(titles[0].textContent == 'Tests that crashed (2):');
        assertTrue(titles[1].textContent == 'Tests where results did not match expected results (5):');
        assertTrue(titles[2].textContent == 'Tests that had no expected results (probably new) (1):');
        assertTrue(titles[3].textContent == 'Tests that timed out (1):');
        assertTrue(titles[4].textContent == 'Tests that had stderr output (1):');
        assertTrue(titles[5].textContent == 'Tests expected to fail but passed (1):');
    }