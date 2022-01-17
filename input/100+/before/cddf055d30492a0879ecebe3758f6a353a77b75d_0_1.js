function () {
            var attribute = new Attr("test"),
                validator = function () {
                    return 5 > 3;
                },
                error = "5 must be greater than 3",
                def = 5,
                clonedAttr,
                objA = {},
                objB = {};

            attribute.validatesWith(validator).and.errorsWith(error).and.defaultsTo(def);
            clonedAttr = attribute.clone();
            
            expect(clonedAttr.validator()()).toBe(true);
            expect(clonedAttr.errorMessage()).toBe(error);
            
            attribute.addTo(objA);
            clonedAttr.addTo(objB);
            
            expect(objA.test()).toBe(def);
            expect(objB.test()).toBe(def);
            expect(objA.test()).toEqual(objB.test());
        }