function() {
                var listItems = list.all('li');
                Assert.isTrue(listItems.size() > 6, ' - Failed to find more than 6 results for ' + inputStr);
                Assert.areEqual('701 1st Ave, Manhattan, NY 10017, USA', listItems.item(1).getHTML(), 'failed to find correct 2nd item in list');
            }