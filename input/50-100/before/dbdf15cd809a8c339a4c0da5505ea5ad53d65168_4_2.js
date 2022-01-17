function(){

            makeCE('.foo');

            expect(ce.item(2).dom.id).toBe('g');    

        }