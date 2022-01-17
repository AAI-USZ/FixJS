function() {
            var input =  Y.one('.example #demo #ac-input'),
                list = Y.one('.example #demo .yui3-aclist-list'),
                inputStr = "javascript, ht";
            input.focus();
            input.set('value', inputStr);

            var interval = 10,
                timeout = 10000,
                condition = function() {
                    // Return a truthy/falsey result.
                    return (list.one('li').getHTML().indexOf('yui3-highlight') > -1);
                    // For example:
                    // return Y.one("#waitForMe") !== null
                },
            success = function() {
                var listItems = list.all('li');
                listItems.item(0).simulate('click');
                Assert.areEqual('javascript, html, ', input.get('value'), ' - Failed to find selected item text in input')
            },
            failure = function() {
                Y.Assert.fail("#waitForMe never showed up in " + timeout + "ms");
            };

            // failure is optional. Will default to "wait() without resume()" error
            this.poll(condition, interval, timeout, success, failure);
        }