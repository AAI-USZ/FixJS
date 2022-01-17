function() {

            Assert.areEqual(8, th.size(), ' - Wrong number of th');
            Assert.isTrue((td.size() > 20), ' - Wrong number of td');
            Assert.isTrue((tr.size() > 10), ' - Wrong number of tr');
            Assert.isTrue((tr.item(3).hasClass('yui3-datatable-odd')), ' - Failed to assign odd row class');
            Assert.isTrue((td.item(0).getHTML().indexOf('type="checkbox"') > -1), ' - Failed to insert input HTML');
        }