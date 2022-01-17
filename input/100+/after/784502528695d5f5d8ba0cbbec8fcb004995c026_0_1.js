function() {
                var listItems = list.all('li');

                listItems.item(1).simulate('click');
                Assert.areEqual('javascript, ', input.get('value'), ' - Failed to find selected item text in input')
            }