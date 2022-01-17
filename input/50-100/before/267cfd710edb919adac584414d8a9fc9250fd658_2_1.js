function() {
                expect(wigData.length).toBeGreaterThan(19);
                expect(wigData.length).toBeLessThan(100);
                dojo.forEach( wigData, function(feature) {
                    expect(feature.get('start')).toBeGreaterThan(80000);
                    expect(feature.get('end')).toBeLessThan(2050000);
                });
                     //console.log(wigData);
            }