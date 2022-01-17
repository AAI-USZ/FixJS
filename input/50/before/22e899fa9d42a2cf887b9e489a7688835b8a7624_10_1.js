function() {
        expect( include.resolve('a/b/c') ).toEqual(__dirname+'/'+'a/b/c');
    }