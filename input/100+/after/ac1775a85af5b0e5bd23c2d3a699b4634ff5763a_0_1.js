function() {
            var propertyStr = 'borderTopStyle',
                val = 'solid',
                selector = 'td',
                property = Y.one(selector).getComputedStyle(propertyStr);
            property = property.replace(/\s/g, ""); //remove spaces from string
            Assert.areEqual(val, property, ' - Failed to set ' + selector + ' to ' + propertyStr + ' to ' + val);
        }