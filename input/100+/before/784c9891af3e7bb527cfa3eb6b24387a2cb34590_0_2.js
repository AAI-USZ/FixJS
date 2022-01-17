function() {
            var input =  Y.one('.example #demo #ac-input'),
                list = Y.one('.example #demo .yui3-aclist-list'),
                inputStr = "beagle";
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
                var photos = Y.one('.example #photos');
                list.one('li').simulate('click');
                Assert.areEqual(1, photos.all('li img').size(), ' - Failed to find exactly 1 selected photo');

                list.one('li').simulate('click');
                Assert.areEqual(2, photos.all('li img').size(), ' - Failed to find exactly 2 selected photo');
            },
            failure = function() {
                Y.Assert.fail("#waitForMe never showed up in " + timeout + "ms");
            };

            // failure is optional. Will default to "wait() without resume()" error
            this.poll(condition, interval, timeout, success, failure);
        }