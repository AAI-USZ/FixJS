function() {
            var input =  Y.one('.example #demo #ac-input'),
                list = Y.one('.example #demo .yui3-aclist-list'),
                interval = 10,
                timeout = 10000;

                var listItems = list.all('li');

                listItems.item(1).simulate('click');
                Assert.areEqual('javascript, ', input.get('value'), ' - Failed to find selected item text in input')

        }