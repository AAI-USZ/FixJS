function (next) {
        var emp = new Employee({
            firstName:"doug",
            lastName:"martin",
            position:1,
            midInitial:null,
            gender:"M",
            street:"1 nowhere st.",
            city:"NOWHERE"});
        emp.save().then(function () {
            assert.instanceOf(emp, Employee);
            assert.equal("doug", emp.firstName);
            assert.equal("martin", emp.lastName);
            assert.isNull(emp.midInitial);
            assert.equal("M", emp.gender);
            assert.equal("1 nowhere st.", emp.street);
            assert.equal("NOWHERE", emp.city);
            next();
        }, next);

    }