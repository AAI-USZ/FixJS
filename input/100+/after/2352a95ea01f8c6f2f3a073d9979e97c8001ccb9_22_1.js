function() {
        var q = new Quaternion(1.0, 2.0, 3.0, 4.0);
        var r = new Quaternion(5.0, 6.0, 7.0, 8.0);
        var t = 0.75;
        var s = q.multiplyByScalar(1.0 - t).add(r.multiplyByScalar(t));
        expect(q.lerp(0.0, r).equals(q)).toEqual(true);
        expect(q.lerp(1.0, r).equals(r)).toEqual(true);
        expect(q.lerp(t, r).equals(s)).toEqual(true);
    }