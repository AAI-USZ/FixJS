function() {
        var cartographic = new Cartographic3(1.0, 2.0, 3.0);
        var returnedResult = cartographic.clone(cartographic);
        expect(cartographic).toBe(returnedResult);
    }