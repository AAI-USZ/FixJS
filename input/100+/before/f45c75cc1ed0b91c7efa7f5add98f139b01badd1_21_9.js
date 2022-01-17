function () {

            it.should("support count", function (next) {
                Employee.count().then(function (count) {
                    assert.equal(count, 20);
                    next();
                }, next);
            });

            it.should("support all", function (next) {
                Employee.all().then(function (emps) {
                    assert.lengthOf(emps, 20);
                    emps.forEach(function (e) {
                        assert.instanceOf(e, Employee);
                    });
                    next();
                }, next);
            });


            it.should("support map", function (next) {
                comb.executeInOrder(Employee,
                    function (Employee) {
                        var ret = {};
                        ret.query1 = Employee.map("id");
                        ret.query2 = Employee.order("position").map(function (e) {
                            return e.firstName + " " + e.lastName;
                        });
                        return ret;
                    }).then(function (res) {
                        assert.lengthOf(res.query1, 20);
                        res.query1.forEach(function (id, i) {
                            assert.equal(id, i + 1);
                        });
                        assert.lengthOf(res.query2, 20);
                        res.query2.forEach(function (name, i) {
                            assert.equal(name, "first" + i + " last" + i);
                        });
                        next();
                    }, next);
            });

            it.should("support forEach", function (next) {
                var ret = [];
                Employee.forEach(function (emp) {
                    ret.push(emp);
                }).then(function (topic) {
                        assert.lengthOf(topic, 20);
                        ret.forEach(function (e) {
                            assert.instanceOf(e, Employee);
                        });
                        next();
                    }, next);
            });

            it.should("support one", function (next) {
                Employee.one().then(function (emp) {
                    assert.instanceOf(emp, Employee);
                    assert.equal(emp.id, 1);
                    next();
                }, next);
            });

            it.should("support first", function (next) {
                var id = sql.identifier("id");
                Employee.first(id.gt(5), id.lt(11)).then(function (emp) {
                    assert.instanceOf(emp, Employee);
                    assert.equal(emp.id, 6);
                    next();
                });
            });

            it.should("support last", function (next) {
                Employee.order("firstName").last().then(function (emp) {
                    assert.throws(hitch(Employee, "last"));
                    assert.instanceOf(emp, Employee);
                    assert.equal(emp.firstName, "first9");
                    next();
                }, next);
            });

        }