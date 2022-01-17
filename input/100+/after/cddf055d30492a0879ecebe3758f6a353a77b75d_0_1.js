function () {
            var attribute = new Attr("test"),
                validator = function () {
                    this.message = "5 must be greater than 3";
                    return 5 > 3;
                },
                def = 5,
                clonedAttr,
                objA = {},
                objB = {};

            attribute.validatesWith(validator).and.defaultsTo(def);
            clonedAttr = attribute.clone();
            
            expect(clonedAttr.validator()()).toBe(true);
            
            attribute.addTo(objA);
            clonedAttr.addTo(objB);
            
            expect(objA.test()).toBe(def);
            expect(objB.test()).toBe(def);
            expect(objA.test()).toEqual(objB.test());
        }