function() {
        expect(function() {
            Matrix4.fromRotationTranslation(undefined, new Cartesian3());
        }).toThrow();
    }