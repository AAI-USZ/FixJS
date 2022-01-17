function() {
                var listItems = list.all('li');
                Assert.isTrue(listItems.size() > 6, ' - Failed to find more than 6 results for ' + inputStr);
            }