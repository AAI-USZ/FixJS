function (next) {
            Employee.findById(1).then(function (emp) {
                assert.instanceOf(emp, Employee);
                assert.equal(emp.id, 1);
                next();
            }, next);
        }