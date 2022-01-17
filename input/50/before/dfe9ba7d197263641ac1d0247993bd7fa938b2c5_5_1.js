function expectError(ErrConstructor) {

    return function expectReferenceError(err) {

        expect(err.constructor.name).to.be(ErrConstructor.name);

    };

}