function (next) {
        var emp = new Employee({
            firstname:"doug",
            lastname:"martin",
            position:1,
            midinitial:null,
            gender:"M",
            street:"1 nowhere st.",
            city:"NOWHERE",
            buffertype:"buffer data",
            texttype:"text data",
            blobtype:"blob data"
        });
        var emitCount = 0;
        var callback = function () {
            emitCount++;
        };
        var events = ["save", "update", "remove"];
        events.forEach(function (e) {
            emp.on(e, callback);
            Employee.on(e, callback);
        });
        comb.serial([
            emp.save.bind(emp),
            emp.update.bind(emp, {firstname:"ben"}),
            emp.remove.bind(emp)
        ]).then(function () {
                assert.equal(emitCount, 6);
                events.forEach(function (e) {
                    emp.removeListener(e, callback);
                    Employee.removeListener(e, callback);
                });
                next();
            }, next);

    }