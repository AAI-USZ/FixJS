function (emp) {
                assert.instanceOf(emp, Employee);
                assert.equal(emp.id, emps[0].id);
                next();
            }