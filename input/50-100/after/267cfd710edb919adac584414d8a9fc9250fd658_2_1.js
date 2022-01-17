function() {
                expect(wigData.length).toBeGreaterThan(19);
                expect(wigData.length).toBeLessThan(1000);
                dojo.forEach( wigData, function(feature) {
                    expect(feature.get('start')).toBeGreaterThan(10000);
                    expect(feature.get('end')).toBeLessThan(30000);
                });
                     //console.log(wigData);
            }