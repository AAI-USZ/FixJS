function (emp) {
                    assert.instanceOf(emp, Employee);
                    assert.equal(emp.id, 6);
                    next();
                }