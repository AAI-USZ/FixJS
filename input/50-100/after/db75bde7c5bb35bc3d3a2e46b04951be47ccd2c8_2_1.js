function() {
        collection.addSpindle();
        collection.addFreeLook();
        expect(function() {
            collection.update();
        }).not.toThrow();
        expect(collection.getLength()).toEqual(2);
    }