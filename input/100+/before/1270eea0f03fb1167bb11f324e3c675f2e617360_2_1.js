function () {
            var renderFinished = false,
                canvas = document.createElement("canvas"),
                svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"></svg>';

            rasterizeHTML.drawSvgToCanvas(svg, canvas, function () { renderFinished = true; });

            waitsFor(function () {
                return renderFinished;
            }, "rasterizeHTML.drawSvgToCanvas", 2000);

            runs(function () {
                if (window.navigator.userAgent.indexOf("Firefox") >= 0 || window.navigator.userAgent.indexOf("Chrome") >= 0) {
                    expect($("#rasterizeHTML_js_FirefoxWorkaround")).toExist();
                    expect($("#rasterizeHTML_js_FirefoxWorkaround svg")).toExist();
                    expect($("#rasterizeHTML_js_FirefoxWorkaround svg").css("visibility")).toEqual("hidden");
                } else {
                    expect($("#rasterizeHTML_js_FirefoxWorkaround")).not.toExist();
                }
            });
        }