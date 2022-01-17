function() {
                var listItems = list.all('li');

                listItems.item(2).simulate('click');
                Assert.areEqual('701 1st Ave, Manhattan, NY 10016, USA', input.get('value'), ' - Failed to find selected item text in input')
                Assert.areEqual('40.74754', Y.one('#locationLat').getHTML(), ' - Failed to find 3rd item selected');
                Assert.areEqual('-73.97078', Y.one('#locationLng').getHTML(), ' - Failed to find 3rd item selected');
            }