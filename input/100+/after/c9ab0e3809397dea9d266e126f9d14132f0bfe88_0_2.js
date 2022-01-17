function () {
        comb.when(
            new Employee({name:"Bob"}).save(),
            new Staff({name:"Greg"}).save(),
            new Manager({name:"Jane"}).save(),
            new Executive({name:"Sue"}).save()
        ).then(function () {
                Employee.forEach(
                    function (emp) {
                        console.log("Employees %d", emp.id);
                        console.log("\tname - ", emp.name);
                        console.log("\tkind - ", emp.kind);
                        console.log("\tinstanceof Employee? ", emp instanceof Employee);
                        console.log("\tinstanceof Staff? ", emp instanceof Staff);
                        console.log("\tinstanceof Manager? ", emp instanceof Manager);
                        console.log("\tinstanceof Executive? ", emp instanceof Executive);
                    }).then(dropTableAndDisconnect, dropTableAndDisconnectErr);
            }, dropTableAndDisconnectErr);
    }