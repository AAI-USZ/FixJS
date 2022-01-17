function(){

            it("should return null when there are no items", function(){

                makeCE();

                expect(ce.first()).toBeNull();

            });

            

            it("should return the first item", function(){

                makeCE('.foo');

                expect(ce.first().dom.id).toBe('a');    

            });

        }