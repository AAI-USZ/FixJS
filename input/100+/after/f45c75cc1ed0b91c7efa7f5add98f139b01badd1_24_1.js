function () {
        assert.deepEqual(patio.CURRENT_DATE, new Constant("CURRENT_DATE"));
        assert.deepEqual(patio.CURRENT_TIME, new Constant("CURRENT_TIME"));
        assert.deepEqual(patio.CURRENT_TIMESTAMP, new Constant("CURRENT_TIMESTAMP"));
        assert.deepEqual(patio.SQLTRUE, new BooleanConstant(1));
        assert.deepEqual(patio.TRUE, new BooleanConstant(1));
        assert.deepEqual(patio.SQLFALSE, new BooleanConstant(0));
        assert.deepEqual(patio.FALSE, new BooleanConstant(0));
        assert.deepEqual(patio.NULL, new BooleanConstant(null));
        assert.deepEqual(patio.NOTNULL, new NegativeBooleanConstant(null));
        assert.equal(patio.identifierInputMethod, null);
        assert.equal(patio.identifierOutputMethod, null);
        assert.equal(patio.quoteIdentifiers, true);
    }