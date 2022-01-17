function () {
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
        assert.isString(emp.firstname);
        assert.isString(emp.lastname);
        assert.isNumber(emp.position);
        assert.isNull(emp.midinitial);
        assert.isString(emp.gender);
        assert.isString(emp.street);
        assert.isString(emp.city);
        assert.isTrue(Buffer.isBuffer(emp.buffertype));
        assert.isString(emp.texttype);
        assert.isTrue(Buffer.isBuffer(emp.blobtype));
    }