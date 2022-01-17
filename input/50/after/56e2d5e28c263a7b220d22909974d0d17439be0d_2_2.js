function() {
                c.add(m);
                expect(c.get(1)).toBe(m);
                expect(c.length).toEqual(1);
            }