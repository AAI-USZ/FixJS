function () {
            assert.instanceOf(emp, Employee);
            assert.equal(emp.firstName, "doug");
            assert.equal(emp.lastName, "martin");
            assert.isNull(emp.midInitial);
            assert.equal(emp.gender, "M");
            assert.equal(emp.street, "1 nowhere st.");
            assert.equal(emp.city, "NOWHERE");
            assert.deepEqual(emp.bufferType, new Buffer("buffer data"));
            assert.deepEqual(emp.textType, "text data");
            assert.deepEqual(emp.blobType, new Buffer("blob data"));
            next();
        }