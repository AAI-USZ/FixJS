function (configObj) {
            //hasMultiAccess was set to false
            expect(configObj.hasMultiAccess).toEqual(false);
            expect(configObj.accessList).toEqual([ {
                features : extManager.getGlobalFeatures(),
                uri : 'WIDGET_LOCAL',
                allowSubDomain : true
            }, {
                "features" : extManager.getGlobalFeatures(),
                "uri" : "http://www.somedomain1.com"
            } ]);
        }