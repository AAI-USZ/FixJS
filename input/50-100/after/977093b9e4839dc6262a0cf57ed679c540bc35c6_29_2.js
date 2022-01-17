function() {
        var cartographic = new Cartographic3(1.0, 2.0, 3.0);
        var result = new Cartographic3();
        var returnedResult = cartographic.clone(result);
        expect(cartographic).toNotBe(result);
        expect(result).toBe(returnedResult);
        expect(cartographic).toEqual(result);
    }