function (next) {
                var id = sql.identifier("id");
                Employee.first(id.gt(5), id.lt(11)).then(function (emp) {
                    assert.instanceOf(emp, Employee);
                    assert.equal(emp.id, 6);
                    next();
                });
            }