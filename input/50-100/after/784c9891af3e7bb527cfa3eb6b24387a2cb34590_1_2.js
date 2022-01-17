function() {
                var listItems = list.all('li');
                listItems.item(2).simulate('click');
                Assert.isTrue((Y.one('#locationLat').getHTML() !== ''), ' - Failed to find 3rd item selected');
                Assert.isTrue((Y.one('#locationLng').getHTML() !== ''), ' - Failed to find 3rd item selected');
            }