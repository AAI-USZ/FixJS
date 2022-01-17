function() {
        expect( include.resolve('a/b/c') ).toEqual(env.dirname+'/'+'a/b/c');
    }