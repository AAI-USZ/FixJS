function(testRun) {
        var data = {
            classname: 'cars',
            limit: 1,
            skip: 0,
            where: {
                user_id: drillbitUserId,
                mileage: { '$gt': 5000, '$lt': 15000 },
                color: 'blue'
            }
        };
        Cloud.Objects.query(data, function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            valueOf(testRun, e.cars.length).shouldBe(1);
            valueOf(testRun, e.cars[0].id).shouldBe(Objects.ids[0]);
            finish(testRun);
        });
    }