function (configObj) {
            //hasMultiAccess was set to true
            expect(configObj.hasMultiAccess).toEqual(true);
            expect(configObj.accessList).toEqual([ {
                features : extManager.getGlobalFeatures(),
                uri : 'WIDGET_LOCAL',
                allowSubDomain : true
            }, {
                "features" : extManager.getGlobalFeatures(),
                "uri" : "http://www.somedomain1.com"
            } ]);
        }