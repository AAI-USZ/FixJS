function (it) {
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
        it.beforeEach(function () {
            return comb.executeInOrder(Company, Employee, function (Company, Employee) {
                Company.remove();
                Employee.remove();
                new Company({companyName:"Google", employees:employees}).save();
            });
        });

        it.should("the removing of filtered associations and deleting them", function (next) {
            comb.executeInOrder(Company, Employee,
                function (Company, Employee) {
                    var company = Company.one();
                    var omahaEmps = company.omahaEmployees;
                    var lincolnEmps = company.lincolnEmployees;
                    company.removeOmahaEmployee(omahaEmps[0], true);
                    company.removeLincolnEmployee(lincolnEmps[0], true);
                    return {omahaEmployees:company.omahaEmployees, lincolnEmployees:company.lincolnEmployees, empCount:Employee.count()};
                }).then(function (ret) {
                    var omahaEmps = ret.omahaEmployees, lincolnEmps = ret.lincolnEmployees;
                    assert.lengthOf(omahaEmps, 0);
                    assert.lengthOf(lincolnEmps, 0);
                    assert.equal(ret.empCount, 1);
                    next();
                }, next);
        });

        it.should("the removing of filtered associations without deleting them", function (next) {
            comb.executeInOrder(Company, Employee,
                function (Company, Employee) {
                    var company = Company.one();
                    var omahaEmps = company.omahaEmployees;
                    var lincolnEmps = company.lincolnEmployees;
                    company.removeOmahaEmployee(omahaEmps[0]);
                    company.removeLincolnEmployee(lincolnEmps[0]);
                    return {omahaEmployees:company.omahaEmployees, lincolnEmployees:company.lincolnEmployees, empCount:Employee.count()};
                }).then(function (ret) {
                    var omahaEmps = ret.omahaEmployees, lincolnEmps = ret.lincolnEmployees;
                    assert.lengthOf(omahaEmps, 0);
                    assert.lengthOf(lincolnEmps, 0);
                    assert.equal(ret.empCount, 3);
                    next();
                }, next);
        });

        it.should("the removing of filtered associations and deleting them", function (next) {
            comb.executeInOrder(Company, Employee,
                function (Company, Employee) {
                    var company = Company.one();
                    var omahaEmps = company.omahaEmployees;
                    var lincolnEmps = company.lincolnEmployees;
                    company.removeOmahaEmployees(omahaEmps, true);
                    company.removeLincolnEmployees(lincolnEmps, true);
                    return {omahaEmployees:company.omahaEmployees, lincolnEmployees:company.lincolnEmployees, empCount:Employee.count()};
                }).then(function (ret) {
                    var omahaEmps = ret.omahaEmployees, lincolnEmps = ret.lincolnEmployees;
                    assert.lengthOf(omahaEmps, 0);
                    assert.lengthOf(lincolnEmps, 0);
                    assert.equal(ret.empCount, 1);
                    next();
                }, next);
        });

        it.should("the removing of filtered associations without deleting them", function (next) {
            comb.executeInOrder(Company, Employee,
                function (Company, Employee) {
                    var company = Company.one();
                    var omahaEmps = company.omahaEmployees;
                    var lincolnEmps = company.lincolnEmployees;
                    company.removeOmahaEmployees(omahaEmps);
                    company.removeLincolnEmployees(lincolnEmps);
                    return {omahaEmployees:company.omahaEmployees, lincolnEmployees:company.lincolnEmployees, empCount:Employee.count()};
                }).then(function (ret) {
                    var omahaEmps = ret.omahaEmployees, lincolnEmps = ret.lincolnEmployees;
                    assert.lengthOf(omahaEmps, 0);
                    assert.lengthOf(lincolnEmps, 0);
                    assert.equal(ret.empCount, 3);
                    next();
                }, next);
        });
    }