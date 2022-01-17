function () {
            assert.instanceOf(emp, Employee);
            assert.equal("doug", emp.firstName);
            assert.equal("martin", emp.lastName);
            assert.isNull(emp.midInitial);
            assert.equal("M", emp.gender);
            assert.equal("1 nowhere st.", emp.street);
            assert.equal("NOWHERE", emp.city);
            next();
        }