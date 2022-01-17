function () {
        var emp = new Employee({
            firstname:"doug",
            lastname:"martin",
            position:1,
            midinitial:null,
            gender:"M",
            street:"1 nowhere st.",
            city:"NOWHERE",
            bufferType:"buffer data",
            textType:"text data",
            blobType:"blob data"
        });
        assert.isString(emp.firstname);
        assert.isString(emp.lastname);
        assert.isNumber(emp.position);
        assert.isNull(emp.midinitial);
        assert.isString(emp.gender);
        assert.isString(emp.street);
        assert.isString(emp.city);
        assert.isTrue(Buffer.isBuffer(emp.bufferType));
        assert.isTrue(Buffer.isBuffer(emp.textType));
        assert.isTrue(Buffer.isBuffer(emp.blobType));
    }