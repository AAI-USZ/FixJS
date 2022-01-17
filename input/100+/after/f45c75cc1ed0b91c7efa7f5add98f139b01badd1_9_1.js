function (next) {
            var employees = [];
            for (var i = 0; i < 3; i++) {
                employees.push({
                    lastName:"last" + i,
                    firstName:"first" + i,
                    midInitial:"m",
                    gender:gender[i % 2],
                    street:"Street " + i,
                    city:cities[i % 3]
                });
            }
            var c1 = new Company({
                companyName:"Google",
                employees:employees
            });
            c1.save().then(function () {
                Company.one().then(function (ret) {
                    var emps = ret.employees;
                    assert.lengthOf(ret.employees, 3);
                    assert.lengthOf(ret.omahaEmployees, 1);
                    assert.isTrue(ret.omahaEmployees.every(function (emp) {
                        return emp.city.match(/omaha/i) !== null;
                    }));
                    assert.lengthOf(ret.lincolnEmployees, 1);
                    assert.isTrue(ret.lincolnEmployees.every(function (emp) {
                        return emp.city.match(/lincoln/i) !== null;
                    }));
                    next();
                }, next);
            }, next);
        }