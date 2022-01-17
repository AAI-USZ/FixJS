function expectError(ErrConstructor) {

    return function expectReferenceError(err) {

        expect(err.constructor.name === ErrConstructor.name).to.be(true);

    };

}