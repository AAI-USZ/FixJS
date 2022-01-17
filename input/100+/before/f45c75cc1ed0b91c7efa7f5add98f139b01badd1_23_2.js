function () {
            assert.instanceOf(emp, Employee);
            assert.equal(emp.firstname, "doug");
            assert.equal(emp.lastname, "martin");
            assert.isNull(emp.midinitial);
            assert.equal(emp.gender, "M");
            assert.equal(emp.street, "1 nowhere st.");
            assert.equal(emp.city, "NOWHERE");
            assert.deepEqual(emp.bufferType, new Buffer("buffer data"));
            assert.deepEqual(emp.textType, new Buffer("text data"));
            assert.deepEqual(emp.blobType, new Buffer("blob data"));
            next();
        }