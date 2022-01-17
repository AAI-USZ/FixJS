function (next) {
            var omahaEmployees = [], lincolnEmployees = [];
            for (var i = 0; i < 3; i++) {
                omahaEmployees.push({
                    lastname:"last" + i,
                    firstname:"first" + i,
                    midInitial:"m",
                    gender:gender[i % 2],
                    street:"Street " + i,
                    city:"Omaha"
                });
            }
            for (i = 0; i < 3; i++) {
                lincolnEmployees.push({
                    lastname:"last" + i,
                    firstname:"first" + i,
                    midInitial:"m",
                    gender:gender[i % 2],
                    street:"Street " + i,
                    city:"Lincoln"
                });
            }
            comb.executeInOrder(Company,
                function (Company) {
                    var company = Company.one();
                    company.addOmahaEmployees(omahaEmployees);
                    company.addLincolnEmployees(lincolnEmployees);
                    return {omahaEmployees:company.omahaEmployees, lincolnEmployees:company.lincolnEmployees};
                }).then(function (ret) {
                    assert.lengthOf(ret.omahaEmployees, 3);
                    assert.lengthOf(ret.lincolnEmployees, 3);
                    next();
                }, next);
        }