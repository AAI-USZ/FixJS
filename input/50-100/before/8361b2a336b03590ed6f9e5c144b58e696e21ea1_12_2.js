function(e) {
            valueOf(testRun, e.success).shouldBeTrue();
            valueOf(testRun, e.error).shouldBeFalse();
            for (var i = 0; i < e.test.length; i++) {
                testIds.push(e.test[i].id);
            }
            Cloud.Objects.remove({ classname: 'test', ids:testIds.toString() }, testsRemoved);
        }