function (emp) {
                var orig = emp.lastname;
                emp.lastname = "martin";
                emp.reload().then(function () {
                    assert.instanceOf(emp, Employee);
                    assert.equal(emp.lastname, orig);
                    next();
                }).classic(next);
            }