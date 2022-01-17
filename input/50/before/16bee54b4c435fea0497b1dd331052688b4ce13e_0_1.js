function() {
        
        var check = function() {
            jsHintCheck("dummyFile.js", "hasOwnProperty = 0");
        };
        expect(check).toThrow();
    }