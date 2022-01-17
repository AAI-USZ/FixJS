function(){
            var other = new Ext.CompositeElementLite();
            other.add(byId('a'));
            other.add(byId('b'));
            other.add(byId('c'));
            makeCE();
            ce.fill(other);
            expect(ce.getCount()).toBe(3);
        }