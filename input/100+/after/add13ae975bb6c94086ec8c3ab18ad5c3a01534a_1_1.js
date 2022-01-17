function() {
            var tableSelector = '#allowhtml ',
                th = Y.all(tableSelector + 'th'),
                td = Y.all(tableSelector + 'td'),
                tr = Y.all(tableSelector + 'tr'),
                cap = Y.one(tableSelector + 'caption');

            Assert.areEqual(3, th.size(), ' - Wrong number of th');
            Assert.areEqual(9, td.size(), ' - Wrong number of th');
            Assert.areEqual(4, tr.size(), ' - Wrong number of tr');
            Assert.isTrue((tr.item(2).hasClass('yui3-datatable-odd')), ' - Failed to assign odd row class');
            Assert.isTrue((td.item(0).getHTML().indexOf('checkbox') > -1), ' - Failed to insert input HTML');
            Assert.areEqual('Allowing HTML content in cells', cap.getHTML(), ' - Wrong or no caption');
        }