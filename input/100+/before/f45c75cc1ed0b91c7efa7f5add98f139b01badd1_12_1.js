function (next) {
            var employees = [];
            for (var i = 0; i < 3; i++) {
                employees.push({
                    lastname:"last" + i,
                    firstname:"first" + i,
                    midinitial:"m",
                    gender:gender[i % 2],
                    street:"Street " + i,
                    city:cities[i % 3]
                });
            }
            var c1 = new Company({
                companyName:"Google",
                employees:employees
            });
            c1.save().then(function () {
                assert.lengthOf(c1.employees, 3);
                assert.lengthOf(c1.omahaEmployees, 1);
                assert.isTrue(c1.omahaEmployees.every(function (emp) {
                    return emp.city.match(/omaha/i) !== null;
                }));
                assert.lengthOf(c1.lincolnEmployees, 1);
                assert.isTrue(c1.lincolnEmployees.every(function (emp) {
                    return emp.city.match(/lincoln/i) !== null;
                }));
                next();

            }, next);
        }