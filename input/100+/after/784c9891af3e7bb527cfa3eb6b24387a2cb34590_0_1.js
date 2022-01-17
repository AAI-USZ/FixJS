function() {
            var input =  Y.one('.example #demo #ac-input'),
                list = Y.one('.example #demo .yui3-aclist-list'),
                inputStr = "a";
            input.focus();
            input.set('value', inputStr);

            var interval = 10,
                timeout = 10000,
                condition = function() {
                    // Return a truthy/falsey result.
                    return (list.all('li').size() > 0);
                    // For example:
                    // return Y.one("#waitForMe") !== null
                },
            success = function() {
                Assert.isTrue((list.all('li').size() > 0), ' - Failed to find more than 0 results for ' + inputStr);
                Assert.isTrue((list.one('li').all('img').size() === 1), ' - Failed to find exactly one image in the first ac-list item');
                Assert.areEqual(inputStr.toLowerCase(), list.one('.yui3-highlight').getHTML().toLowerCase(), 'failed to hightlight ' + inputStr + ' on first result');
            },
            failure = function() {
                Y.Assert.fail("#waitForMe never showed up in " + timeout + "ms");
            };

            // failure is optional. Will default to "wait() without resume()" error
            this.poll(condition, interval, timeout, success, failure);
        }