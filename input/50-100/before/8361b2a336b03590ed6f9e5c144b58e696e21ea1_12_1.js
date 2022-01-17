function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            for (var i = 0; i < e.cars.length; i++) {
                carIds.push(e.cars[i].id);
            }
            Cloud.Objects.remove({ classname: 'cars' , ids:carIds.toString() }, carsRemoved);
        }