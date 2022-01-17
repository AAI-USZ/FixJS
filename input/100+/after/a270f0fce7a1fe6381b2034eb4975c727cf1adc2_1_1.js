function () {
        ////xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

        assert.ok(Validator.check('A987FBC9-4BED-3078-CF07-9141BA07C9F3').isUUID());
        assert.ok(Validator.check('A987FBC9-4BED-3078-CF07-9141BA07C9F3').isUUID(1));
        assert.ok(Validator.check('A987FBC9-4BED-3078-CF07-9141BA07C9F3').isUUID(2));
        assert.ok(Validator.check('A987FBC9-4BED-3078-CF07-9141BA07C9F3').isUUID(3));
        assert.ok(Validator.check('A987FBC9-4BED-4078-8F07-9141BA07C9F3').isUUID(4));

        var badUuids = [
            "",
            null,
            "xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3",
            "A987FBC9-4BED-3078-CF07-9141BA07C9F3xxx",
            "A987FBC94BED3078CF079141BA07C9F3",
            "934859",
            "987FBC9-4BED-3078-CF07A-9141BA07C9F3",
            "AAAAAAAA-1111-1111-AAAG-111111111111"
        ]

        badUuids.forEach(function (item) {
            assert.throws(function() { Validator.check(item).isUUID() },  /not a uuid/i);
            assert.throws(function() { Validator.check(item).isUUID(1) }, /not a uuid/i);
            assert.throws(function() { Validator.check(item).isUUID(2) }, /not a uuid/i);
            assert.throws(function() { Validator.check(item).isUUID(3) }, /not a uuid/i);
            assert.throws(function() { Validator.check(item).isUUID(4) }, /not a uuid/i);
        });

        try {
            Validator.check('A987FBC9-4BED-4078-0F07-9141BA07C9F3').isUUID(4);
            assert.ok(false, 'isUUID failed');
        } catch (e) {}

        try {
            Validator.check('abc').isUUID();
            assert.ok(false, 'isUUID failed');
        } catch (e) {}

        try {
            Validator.check('A987FBC932-4BED-3078-CF07-9141BA07C9').isUUID();
            assert.ok(false, 'isUUID failed');
        } catch (e) {}

        try {
            Validator.check('A987FBG9-4BED-3078-CF07-9141BA07C9DE').isUUID();
            assert.ok(false, 'isUUID failed');
        } catch (e) {}

    }