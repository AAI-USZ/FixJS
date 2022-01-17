function (ret) {
                    var i = 1;
                    var query1 = ret.query1, query2 = ret.query2, query3 = ret.query3, query4 = ret.query4, query5 = ret.query5, query6 = ret.query6;
                    assert.lengthOf(query1, 6);
                    query1.forEach(function (t) {
                        assert.instanceOf(t, Employee);
                        assert.equal(i++, t.id);
                    });
                    assert.equal(query2.id, 10);
                    assert.lengthOf(query3, 3);
                    assert.instanceOf(query3[0], Employee);
                    assert.equal(query3[0].firstname, "first1");
                    assert.instanceOf(query3[1], Employee);
                    assert.equal(query3[1].firstname, "first11");
                    assert.instanceOf(query3[2], Employee);
                    assert.equal(query3[2].firstname, "first12");
                    assert.deepEqual(query4.map(function (e) {
                        assert.instanceOf(e, Employee);
                        return e.id;
                    }), [1, 2, 3, 4, 5]);
                    assert.deepEqual(query5.map(function (e) {
                        assert.instanceOf(e, Employee);
                        return e.id;
                    }), [16, 17, 18, 19, 20]);
                    next();
                }