function () {
        var emp = new Employee({
            firstName:"doug",
            lastName:"martin",
            position:1,
            midInitial:null,
            gender:"M",
            street:"1 nowhere st.",
            city:"NOWHERE",
            bufferType:"buffer data",
            textType:"text data",
            blobType:"blob data"
        });
        assert.isString(emp.firstName);
        assert.isString(emp.lastName);
        assert.isNumber(emp.position);
        assert.isNull(emp.midInitial);
        assert.isString(emp.gender);
        assert.isString(emp.street);
        assert.isString(emp.city);
        assert.isTrue(Buffer.isBuffer(emp.bufferType));
        assert.isString(emp.textType);
        assert.isTrue(Buffer.isBuffer(emp.blobType));
    }