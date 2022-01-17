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
        emp.save().then(function () {
            assert.instanceOf(emp, Employee);
            assert.equal(emp.firstname, "doug");
            assert.equal(emp.lastname, "martin");
            assert.isNull(emp.midinitial);
            assert.equal(emp.gender, "M");
            assert.equal(emp.street, "1 nowhere st.");
            assert.equal(emp.city, "NOWHERE");
            assert.deepEqual(emp.buffertype, new Buffer("buffer data"));
            assert.deepEqual(emp.texttype, "text data");
            assert.deepEqual(emp.blobtype, new Buffer("blob data"));
            next();
        }, next);
    }