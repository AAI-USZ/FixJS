function (configObj) {
            customAccessList = testUtilities.getAccessListForUri(configObj.accessList, 'http://ci0000000094448.rim.net');

            //The custom access list features should only contain global features
            expect(customAccessList.features).toEqual(configParser.getGlobalFeatures());
        }