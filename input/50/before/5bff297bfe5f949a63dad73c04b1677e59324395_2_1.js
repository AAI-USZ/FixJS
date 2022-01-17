function() {
        expect(function() {
            Matrix4.clone(undefined);
        }).toThrow();
    }