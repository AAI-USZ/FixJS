function() {
        expect(24);
        var redToBlue = [
                {position: 0, color: [255, 0, 0, 255]},
                {position: 0.5, color: [255, 0, 255, 255], disabled: true},
                {position: 1, color: [0, 0, 255, 255]}
            ],
            steppedRedToBlue = [
                {position: 0.25, color: [255, 0, 0, 255]},
                {position: 0.5, color: [255, 0, 255, 255], disabled: true},
                {position: 0.75, color: [0, 0, 255, 255]}
            ];

        // Colorstop Generation Tests
        deepEqual(ColorStops.generateCSS("linear", {x:0, y:0}, {x:0, y:"100%"}, redToBlue), [
            "-webkit-gradient(linear, 0 0, 0 100%, from(#f00), to(#00f))",
            "-webkit-linear-gradient(#f00, #00f)",
            "-moz-linear-gradient(#f00, #00f)",
            '-o-linear-gradient(#f00, #00f)',
            'linear-gradient(#f00, #00f)'
        ], "generateCSS(linear, {0,0}, {0,100%}, redToBlue)");

        deepEqual(ColorStops.generateCSS("linear", {x:0, y:0}, {x:0, y:"100%"}, steppedRedToBlue), [
            "-webkit-gradient(linear, 0 0, 0 100%, color-stop(0.25, #f00), color-stop(0.75, #00f))",
            "-webkit-linear-gradient(#f00 25%, #00f 75%)",
            "-moz-linear-gradient(#f00 25%, #00f 75%)",
            '-o-linear-gradient(#f00 25%, #00f 75%)',
            'linear-gradient(#f00 25%, #00f 75%)'
        ], "generateCSS(linear, {0,0}, {0,100%}, steppedRedToBlue)");

        // Position and angle Tests
        deepEqual(ColorStops.generateCSS("linear", {x:0, y:"100%"}, {x:0, y:0}, redToBlue), [
            "-webkit-gradient(linear, 0 100%, 0 0, from(#f00), to(#00f))",
            "-webkit-linear-gradient(90deg, #f00, #00f)",
            "-moz-linear-gradient(90deg, #f00, #00f)",
            '-o-linear-gradient(90deg, #f00, #00f)',
            'linear-gradient(90deg, #f00, #00f)'
        ], "generateCSS(linear, {0,100%}, {0,0}, redToBlue)");

        deepEqual(ColorStops.generateCSS("linear", {x:0, y:0}, {x:"100%", y:0}, redToBlue), [
            "-webkit-gradient(linear, 0 0, 100% 0, from(#f00), to(#00f))",
            "-webkit-linear-gradient(360deg, #f00, #00f)",
            "-moz-linear-gradient(360deg, #f00, #00f)",
            '-o-linear-gradient(360deg, #f00, #00f)',
            'linear-gradient(360deg, #f00, #00f)'
        ], "generateCSS(linear, {0,0}, {100%, 0}, redToBlue)");
        deepEqual(ColorStops.generateCSS("linear", {x:"100%", y:0}, {x:0, y:0}, redToBlue), [
            "-webkit-gradient(linear, 100% 0, 0 0, from(#f00), to(#00f))",
            "-webkit-linear-gradient(180deg, #f00, #00f)",
            "-moz-linear-gradient(180deg, #f00, #00f)",
            '-o-linear-gradient(180deg, #f00, #00f)',
            'linear-gradient(180deg, #f00, #00f)'
        ], "generateCSS(linear, {100%,0}, {0, 0}, redToBlue)");

        deepEqual(ColorStops.generateCSS("linear", {x:0, y:0}, {x:"100%", y:"100%"}, redToBlue), [
            "-webkit-gradient(linear, 0 0, 100% 100%, from(#f00), to(#00f))",
            "-webkit-linear-gradient(315deg, #f00, #00f)",
            "-moz-linear-gradient(315deg, #f00, #00f)",
            '-o-linear-gradient(315deg, #f00, #00f)',
            'linear-gradient(315deg, #f00, #00f)'
        ], "generateCSS(linear, {0,0}, {100%, 100%}, redToBlue)");
        deepEqual(ColorStops.generateCSS("linear", {x:"100%", y:"100%"}, {x:0, y:0}, redToBlue), [
            "-webkit-gradient(linear, 100% 100%, 0 0, from(#f00), to(#00f))",
            "-webkit-linear-gradient(135deg, #f00, #00f)",
            "-moz-linear-gradient(135deg, #f00, #00f)",
            '-o-linear-gradient(135deg, #f00, #00f)',
            'linear-gradient(135deg, #f00, #00f)'
        ], "generateCSS(linear, {100%, 100%}, {0,0}, redToBlue)");

        // Positions that do not fill the entire region
        deepEqual(ColorStops.generateCSS("linear", {x:0, y:"25%"}, {x:0, y:"50%"}, redToBlue), [
            "-webkit-gradient(linear, 0 25%, 0 50%, from(#f00), to(#00f))",
            "-webkit-linear-gradient(#f00 25%, #00f 50%)",
            "-moz-linear-gradient(#f00 25%, #00f 50%)",
            '-o-linear-gradient(#f00 25%, #00f 50%)',
            'linear-gradient(#f00 25%, #00f 50%)'
        ], "generateCSS(linear, {0,25%}, {0,50%}, redToBlue)");
        deepEqual(ColorStops.generateCSS("linear", {x:0, y:"50%"}, {x:0, y:"25%"}, redToBlue), [
            "-webkit-gradient(linear, 0 50%, 0 25%, from(#f00), to(#00f))",
            "-webkit-linear-gradient(90deg, #f00 50%, #00f 75%)",
            "-moz-linear-gradient(90deg, #f00 50%, #00f 75%)",
            '-o-linear-gradient(90deg, #f00 50%, #00f 75%)',
            'linear-gradient(90deg, #f00 50%, #00f 75%)'
        ], "generateCSS(linear, {0,50%}, {0,25%}, redToBlue)");

        deepEqual(ColorStops.generateCSS("linear", {x:"25%", y:0}, {x:"50%", y:0}, redToBlue), [
            "-webkit-gradient(linear, 25% 0, 50% 0, from(#f00), to(#00f))",
            "-webkit-linear-gradient(360deg, #f00 25%, #00f 50%)",
            "-moz-linear-gradient(360deg, #f00 25%, #00f 50%)",
            '-o-linear-gradient(360deg, #f00 25%, #00f 50%)',
            'linear-gradient(360deg, #f00 25%, #00f 50%)'
        ], "generateCSS(linear, {25%,0}, {50%,0}, redToBlue)");
        deepEqual(ColorStops.generateCSS("linear", {x:"50%", y:0}, {x:"25%", y:0}, redToBlue), [
            "-webkit-gradient(linear, 50% 0, 25% 0, from(#f00), to(#00f))",
            "-webkit-linear-gradient(180deg, #f00 50%, #00f 75%)",
            "-moz-linear-gradient(180deg, #f00 50%, #00f 75%)",
            '-o-linear-gradient(180deg, #f00 50%, #00f 75%)',
            'linear-gradient(180deg, #f00 50%, #00f 75%)'
        ], "generateCSS(linear, {50%,0}, {25%,0}, redToBlue)");

        deepEqual(ColorStops.generateCSS("linear", {x:"25%", y:"25%"}, {x:"50%", y:"50%"}, redToBlue), [
            "-webkit-gradient(linear, 25% 25%, 50% 50%, from(#f00), to(#00f))",
            "-webkit-linear-gradient(315deg, #f00 25%, #00f 50%)",
            "-moz-linear-gradient(315deg, #f00 25%, #00f 50%)",
            '-o-linear-gradient(315deg, #f00 25%, #00f 50%)',
            'linear-gradient(315deg, #f00 25%, #00f 50%)'
        ], "generateCSS(linear, {25%,25%}, {50%,50%}, redToBlue)");
        deepEqual(ColorStops.generateCSS("linear", {x:"50%", y:"50%"}, {x:"25%", y:"25%"}, redToBlue), [
            "-webkit-gradient(linear, 50% 50%, 25% 25%, from(#f00), to(#00f))",
            "-webkit-linear-gradient(135deg, #f00 50%, #00f 75%)",
            "-moz-linear-gradient(135deg, #f00 50%, #00f 75%)",
            '-o-linear-gradient(135deg, #f00 50%, #00f 75%)',
            'linear-gradient(135deg, #f00 50%, #00f 75%)'
        ], "generateCSS(linear, {50%,50%}, {25%,25%}, redToBlue)");

        // Shifted offset
        deepEqual(ColorStops.generateCSS("linear", {x:"25%", y:"50%"}, {x:"50%", y:"75%"}, redToBlue), [
            "-webkit-gradient(linear, 25% 50%, 50% 75%, from(#f00), to(#00f))",
            "-webkit-linear-gradient(315deg, #f00 37.5%, #00f 62.5%)",
            "-moz-linear-gradient(315deg, #f00 37.5%, #00f 62.5%)",
            '-o-linear-gradient(315deg, #f00 37.5%, #00f 62.5%)',
            'linear-gradient(315deg, #f00 37.5%, #00f 62.5%)'
        ], "generateCSS(linear, {25%,50%}, {50%,75%}, redToBlue)");

        // Stepped partial
        deepEqual(ColorStops.generateCSS("linear", {x:0, y:"25%"}, {x:0, y:"50%"}, steppedRedToBlue), [
            "-webkit-gradient(linear, 0 25%, 0 50%, color-stop(0.25, #f00), color-stop(0.75, #00f))",
            "-webkit-linear-gradient(#f00 31.2%, #00f 43.7%)",
            "-moz-linear-gradient(#f00 31.2%, #00f 43.7%)",
            '-o-linear-gradient(#f00 31.2%, #00f 43.7%)',
            'linear-gradient(#f00 31.2%, #00f 43.7%)'
        ], "generateCSS(linear, {0,25%}, {0,50%}, steppedRedToBlue)");

        // Non-percentage positions
        deepEqual(ColorStops.generateCSS("linear", {x:25, y:0}, {x:50, y:0}, redToBlue), [
            "-webkit-gradient(linear, 25 0, 50 0, from(#f00), to(#00f))",
            "-webkit-linear-gradient(360deg, #f00 50%, #00f)",
            "-moz-linear-gradient(360deg, #f00 50%, #00f)",
            '-o-linear-gradient(360deg, #f00 50%, #00f)',
            'linear-gradient(360deg, #f00 50%, #00f)'
        ], "generateCSS(linear, {25,0}, {50,0}, redToBlue)");
        deepEqual(ColorStops.generateCSS("linear", {x:0, y:25}, {x:0, y:50}, redToBlue), [
            "-webkit-gradient(linear, 0 25, 0 50, from(#f00), to(#00f))",
            "-webkit-linear-gradient(#f00 50%, #00f)",
            "-moz-linear-gradient(#f00 50%, #00f)",
            '-o-linear-gradient(#f00 50%, #00f)',
            'linear-gradient(#f00 50%, #00f)'
        ], "generateCSS(linear, {0,25}, {0,50}, redToBlue)");
        deepEqual(ColorStops.generateCSS("linear", {x:25, y:25}, {x:50, y:50}, redToBlue), [
            "-webkit-gradient(linear, 25 25, 50 50, from(#f00), to(#00f))",
            "-webkit-linear-gradient(315deg, #f00 50%, #00f)",
            "-moz-linear-gradient(315deg, #f00 50%, #00f)",
            '-o-linear-gradient(315deg, #f00 50%, #00f)',
            'linear-gradient(315deg, #f00 50%, #00f)'
        ], "generateCSS(linear, {25,25}, {50,50}, redToBlue)");
        deepEqual(ColorStops.generateCSS("linear", {x:50, y:50}, {x:25, y:25}, redToBlue), [
            "-webkit-gradient(linear, 50 50, 25 25, from(#f00), to(#00f))",
            "-webkit-linear-gradient(135deg, #f00, #00f 50%)",
            "-moz-linear-gradient(135deg, #f00, #00f 50%)",
            '-o-linear-gradient(135deg, #f00, #00f 50%)',
            'linear-gradient(135deg, #f00, #00f 50%)'
        ], "generateCSS(linear, {50,50}, {25,25}, redToBlue)");
        deepEqual(ColorStops.generateCSS("linear", {x:25, y:25}, {x:50, y:50}, redToBlue, {x:0,y:0, width:100,height:100}), [
            "-webkit-gradient(linear, 25 25, 50 50, from(#f00), to(#00f))",
            "-webkit-linear-gradient(315deg, #f00 25%, #00f 50%)",
            "-moz-linear-gradient(315deg, #f00 25%, #00f 50%)",
            '-o-linear-gradient(315deg, #f00 25%, #00f 50%)',
            'linear-gradient(315deg, #f00 25%, #00f 50%)'
        ], "generateCSS(linear, {25,25}, {50,50}, redToBlue, {0,0,100,100})");
        deepEqual(ColorStops.generateCSS("linear", {x:50, y:50}, {x:25, y:25}, redToBlue, {x:0,y:0, width:100,height:100}), [
            "-webkit-gradient(linear, 50 50, 25 25, from(#f00), to(#00f))",
            "-webkit-linear-gradient(135deg, #f00 50%, #00f 75%)",
            "-moz-linear-gradient(135deg, #f00 50%, #00f 75%)",
            '-o-linear-gradient(135deg, #f00 50%, #00f 75%)',
            'linear-gradient(135deg, #f00 50%, #00f 75%)'
        ], "generateCSS(linear, {50,50}, {25,25}, redToBlue, {0,0,100,100})");

        deepEqual(ColorStops.generateCSS("linear", {x:25.25, y:0}, {x:50.5, y:0}, redToBlue), [
            "-webkit-gradient(linear, 25.25 0, 50.5 0, from(#f00), to(#00f))",
            "-webkit-linear-gradient(360deg, #f00 50%, #00f)",
            "-moz-linear-gradient(360deg, #f00 50%, #00f)",
            '-o-linear-gradient(360deg, #f00 50%, #00f)',
            'linear-gradient(360deg, #f00 50%, #00f)'
        ], "generateCSS(linear, {25.25,0}, {50.5,0}, redToBlue)");

        // Position spacing
        var equallySpaced = [
                {position: 0, color: [255, 0, 0, 255]},
                {position: 0.5, color: [255, 0, 255, 255]},
                {position: 1, color: [0, 0, 255, 255]}
            ],
            notEquallySpaced = [
                {position: 0, color: [255, 0, 0, 255]},
                {position: 0.5, color: [255, 0, 255, 255]},
                {position: 0.75, color: [0, 0, 255, 255]}
            ];
        deepEqual(ColorStops.generateCSS("linear", {x:0, y:0}, {x:0, y:"100%"}, equallySpaced), [
            "-webkit-gradient(linear, 0 0, 0 100%, from(#f00), color-stop(0.5, #f0f), to(#00f))",
            "-webkit-linear-gradient(#f00, #f0f, #00f)",
            "-moz-linear-gradient(#f00, #f0f, #00f)",
            '-o-linear-gradient(#f00, #f0f, #00f)',
            'linear-gradient(#f00, #f0f, #00f)'
        ], "generateCSS(linear, {0,0}, {0,100%}, equallySpaced)");
        deepEqual(ColorStops.generateCSS("linear", {x:0, y:0}, {x:0, y:"100%"}, notEquallySpaced), [
            "-webkit-gradient(linear, 0 0, 0 100%, from(#f00), color-stop(0.5, #f0f), color-stop(0.75, #00f))",
            "-webkit-linear-gradient(#f00, #f0f 50%, #00f 75%)",
            "-moz-linear-gradient(#f00, #f0f 50%, #00f 75%)",
            '-o-linear-gradient(#f00, #f0f 50%, #00f 75%)',
            'linear-gradient(#f00, #f0f 50%, #00f 75%)'
        ], "generateCSS(linear, {0,0}, {0,100%}, notEquallySpaced)");
    }