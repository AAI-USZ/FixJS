function (next) {
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
            }