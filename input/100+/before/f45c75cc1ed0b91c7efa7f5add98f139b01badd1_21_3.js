function () {
            var emps = [];
            for (var i = 0; i < 20; i++) {
                emps.push({
                    lastName:"last" + i,
                    firstName:"first" + i,
                    position:i,
                    midInitial:"m",
                    gender:gender[i % 2],
                    street:"Street " + i,
                    city:"City " + i
                });
            }
            return comb.executeInOrder(Employee, function (emp) {
                emp.truncate();
                emp.save(emps);
            });
        }