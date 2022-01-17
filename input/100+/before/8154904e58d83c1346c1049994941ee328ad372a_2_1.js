function() {
        var json = {
            'a': {
                'a-b': 1,
                '1': 2,
                'undefined': 3,
                '0': 4
            }
        };

        it('.a.a-b +', function() {
            expect(jpath(json, '.a.a-b')).toEqual([1]);
        });

        it('.a.1 +', function() {
            expect(jpath(json, '.a.1')).toEqual([2]);
        });

        it('.a.undefined +', function() {
            expect(jpath(json, '.a.undefined')).toEqual([3]);
        });

        it('.a.0 +', function() {
            expect(jpath(json, '.a.0')).toEqual([4]);
        });

        it('.a[.a-b == \'1\'].1 +', function() {
            expect(jpath(json, '.a[.a-b == \'1\'].1')).toEqual([2]);
        });

        it('.a[.a-b == \'2\'] -', function() {
            expect(jpath(json, '.a[.a-b == "2"]')).toEqual([]);
        });

        it('.a[.1 == "2"].1 +', function() {
            expect(jpath(json, '.a[.1 == "2"].1')).toEqual([2]);
        });

        it('.a[.0 == "4"] +', function() {
            expect(jpath(json, '.a[.1 == "2"]')).toEqual([json.a]);
        });

        it('.a[.undefined].1 +', function() {
            expect(jpath(json, '.a[.undefined].1')).toEqual([2]);
        });

        it('.a[.b-a].undefined +', function() {
            expect(jpath(json, '.a[.b-a].undefined')).toEqual([]);
        });
    }