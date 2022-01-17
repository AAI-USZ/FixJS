function(feature) {
                    expect(feature.get('start')).toBeGreaterThan(80000);
                    expect(feature.get('end')).toBeLessThan(2050000);
                }