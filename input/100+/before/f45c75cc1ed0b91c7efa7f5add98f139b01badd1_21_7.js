function (next) {
            var id = sql.identifier("id");
            comb.executeInOrder(Employee,
                function (Employee) {
                    var ret = {};
                    ret.query1 = Employee.filter({id:[1, 2, 3, 4, 5, 6]}).all();
                    ret.query2 = Employee.filter(id.gt(5), id.lt(11)).order("id").last();
                    ret.query3 = Employee.filter(
                        function () {
                            return this.firstName.like(/first1[1|2]*$/);
                        }).order("firstName").all();
                    ret.query4 = Employee.filter({id:{between:[1, 5]}}).order("id").all();
                    ret.query5 = [];
                    Employee.filter(
                        function () {
                            return this.id.gt(15);
                        }).forEach(
                        function (emp) {
                            ret.query5.push(emp);
                        });
                    return ret;

                }).then(function (ret) {
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
                    assert.equal(query3[0].firstName, "first1");
                    assert.instanceOf(query3[1], Employee);
                    assert.equal(query3[1].firstName, "first11");
                    assert.instanceOf(query3[2], Employee);
                    assert.equal(query3[2].firstName, "first12");
                    assert.deepEqual(query4.map(function (e) {
                        assert.instanceOf(e, Employee);
                        return e.id;
                    }), [1, 2, 3, 4, 5]);
                    assert.deepEqual(query5.map(function (e) {
                        assert.instanceOf(e, Employee);
                        return e.id;
                    }), [16, 17, 18, 19, 20]);
                    next();
                }, next);
        }