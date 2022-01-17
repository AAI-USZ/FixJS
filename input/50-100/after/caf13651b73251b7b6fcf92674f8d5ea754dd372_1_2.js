function() {
            var samples = [
                true,
                0,
                "`~!@#$%^&*()_+-=[]\\{}|;':\",./<>?",
                undefined,
                null
            ];
            for (var i = 0; i < samples.length; i++) {
                if (samples[i] !== arguments[i]) {
                    console.log("FAIL");
                }
            }
        }