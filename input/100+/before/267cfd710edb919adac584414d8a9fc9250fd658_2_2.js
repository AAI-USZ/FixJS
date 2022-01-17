function() {
            var v = b.getZoomedView( 17.34 );
            var wigData;
            v.readWigData( 'SL2.40ch01', 19999, 24999, function(features) {
                wigData = features;
            });
            waitsFor(function() { return wigData; },1000);
            runs(function() {
                expect(wigData.length).toBeGreaterThan(19);
                expect(wigData.length).toBeLessThan(100);
                dojo.forEach( wigData, function(feature) {
                    expect(feature.get('start')).toBeGreaterThan(80000);
                    expect(feature.get('end')).toBeLessThan(2050000);
                });
                     //console.log(wigData);
            });
        }