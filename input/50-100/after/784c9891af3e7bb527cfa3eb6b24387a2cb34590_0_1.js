function() {
                var photos = Y.one('.example #photos');
                list.all('li').item(0).simulate('click');
                Assert.areEqual(1, photos.all('li img').size(), ' - Failed to find exactly 1 selected photo');

                list.all('li').item(1).simulate('click');
                Assert.areEqual(2, photos.all('li img').size(), ' - Failed to find exactly 2 selected photo');
            }