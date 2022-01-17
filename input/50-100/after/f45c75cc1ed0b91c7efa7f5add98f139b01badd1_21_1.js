function (emp) {
                var orig = emp.lastName;
                emp.lastName = "martin";
                emp.reload().then(function () {
                    assert.instanceOf(emp, Employee);
                    assert.equal(emp.lastName, orig);
                    next();
                }).classic(next);
            }