function (emp) {
                    assert.instanceOf(emp, Employee);
                    assert.equal(emp.id, ids[6])
                    next();
                }