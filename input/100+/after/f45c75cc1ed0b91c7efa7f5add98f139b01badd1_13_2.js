function (company) {
                var lincolnEmp = new Employee({
                    lastname:"last",
                    firstname:"first",
                    midInitial:"m",
                    gender:gender[0],
                    street:"Street",
                    city:"Lincoln"
                });
                var omahaEmp = new Employee({
                    lastname:"last",
                    firstname:"first",
                    midInitial:"m",
                    gender:gender[0],
                    street:"Street",
                    city:"Omaha"
                });
                comb.executeInOrder(company,function (company) {
                    company.addOmahaEmployee(omahaEmp);
                    company.addLincolnEmployee(lincolnEmp);
                    return {omahaEmployees:company.omahaEmployees, lincolnEmployees:company.lincolnEmployees};
                }).then(function (ret) {
                        assert.lengthOf(ret.omahaEmployees, 1);
                        assert.lengthOf(ret.lincolnEmployees, 1);
                        next();
                    });
            }