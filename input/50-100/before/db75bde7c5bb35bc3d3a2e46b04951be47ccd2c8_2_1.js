function() {
        collection.add2D();
        collection.addColumbusView();
        expect(function() {
            collection.update();
        }).not.toThrow();
        expect(collection.getLength()).toEqual(2);
    }