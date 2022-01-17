function (it) {

        var emps;
        it.beforeEach(function () {
            emps = [];
            for (var i = 0; i < 20; i++) {
                emps.push(new Employee({
                    lastName:"last" + i,
                    firstName:"first" + i,
                    position:i,
                    midInitial:"m",
                    gender:gender[i % 2],
                    street:"Street s" + i,
                    city:"City " + i
                }));
            }
            return comb.executeInOrder(Employee, function (emp) {
                emp.truncate();
                emp.save(emps);
            });
        });

        it.should("should reload models", function (next) {
            Employee.first().then(function (emp) {
                var orig = emp.lastName;
                emp.lastName = "martin";
                emp.reload().then(function () {
                    assert.instanceOf(emp, Employee);
                    assert.equal(emp.lastName, orig);
                    next();
                }).classic(next);
            }, next);
        });

        it.should("find models by id", function (next) {
            Employee.findById(emps[0].id).then(function (emp) {
                assert.instanceOf(emp, Employee);
                assert.equal(emp.id, emps[0].id);
                next();
            }, next);
        });

        it.should("support the filtering of models", function (next) {
            var id = sql.identifier("id"), ids = emps.map(function(emp){return emp.id;});
            comb.executeInOrder(Employee,
                function (Employee) {
                    var ret = {};
                    ret.query1 = Employee.filter({id:ids.slice(0,6)}).all();
                    ret.query2 = Employee.filter(id.gt(ids[0]), id.lt(ids[5])).order("id").last();
                    ret.query3 = Employee.filter(function () {
                        return this.firstName.like(/first1[1|2]*$/);
                    }).order("firstName").all();
                    ret.query4 = Employee.filter({id:{between:[ids[0], ids[5]]}}).order("id").all();
                    ret.query5 = [];
                    Employee.filter(function () {
                        return this.id.gt(ids[5]);
                    }).forEach(function (emp) {
                            ret.query5.push(emp);
                        });
                    return ret;

                }).then(function (ret) {
                    var i = 0;
                    var query1 = ret.query1, query2 = ret.query2, query3 = ret.query3, query4 = ret.query4, query5 = ret.query5, query6 = ret.query6;
                    assert.lengthOf(query1, 6);
                    query1.forEach(function (t) {
                        assert.instanceOf(t, Employee);
                        assert.equal(ids[i++], t.id);
                    });
                    assert.equal(query2.id, ids[4]);
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
                    }), ids.slice(0,6));
                    assert.deepEqual(query5.map(function (e) {
                        assert.instanceOf(e, Employee);
                        return e.id;
                    }), ids.slice(6));
                    next();
                }, next);
        });

        it.should("support custom query methods", function (next) {
            Employee.findByGender("F").then(function (emps) {
                emps.forEach(function (emp) {
                    assert.instanceOf(emp, Employee);
                    assert.equal("F", emp.gender);
                });
                next();
            }, next);
        });


        it.describe("dataset methods", function (it) {

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
                var ids = emps.map(function(emp){return emp.id;});
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
                            assert.equal(id, ids[i]);
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
                    next();
                }, next);
            });

            it.should("support first", function (next) {
                var id = sql.identifier("id"),ids = emps.map(function(emp){return emp.id;});
                Employee.first(id.gt(ids[5]), id.lt(ids[11])).then(function (emp) {
                    assert.instanceOf(emp, Employee);
                    assert.equal(emp.id, ids[6])
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

        });
    }