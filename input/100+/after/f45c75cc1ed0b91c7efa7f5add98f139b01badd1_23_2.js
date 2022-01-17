function () {
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
        }