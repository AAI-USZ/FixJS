function (next) {
            var emp = new Employee({
                lastname:"last",
                firstname:"first",
                midinitial:"m",
                gender:"M",
                street:"Street",
                city:"Omaha",
                company:{
                    companyName:"Google"
                }
            });
            emp.save().then(function () {
                //reload it here in order to get all the properties
                emp.company.reload().then(function (company) {
                    assert.equal(company.companyName, "Google");
                    assert.lengthOf(company.employees, 1);
                    assert.lengthOf(company.omahaEmployees, 1);
                    assert.isTrue(company.omahaEmployees.every(function (emp) {
                        return emp.city.match(/omaha/i) !== null;
                    }));
                    assert.lengthOf(company.lincolnEmployees, 0);
                    next();
                }, next);
            }, next);
        }