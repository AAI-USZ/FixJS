function() {
            var samples = [
                {a:true, b:0, c:"string"},
                function() { return true; },
                [true, 0, "string"],
                /\d+\w*\//
            ];
            for (var i = 0; i < samples.length; i++) {
                if (typeof samples[i] !== typeof arguments[i] 
                    || samples[i].toString() !== arguments[i].toString()) {
                    console.log("FAIL");
                }
            }
        }