function () {

            beforeEach(function () {
                $(".rasterizeHTML_js_FirefoxWorkaround").remove();
            });

            it("should add hidden svg", function () {
                var renderFinished = false,
                    canvas = document.createElement("canvas"),
                    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"></svg>';

                rasterizeHTML.drawSvgToCanvas(svg, canvas, function () { renderFinished = true; });

                waitsFor(function () {
                    return renderFinished;
                }, "rasterizeHTML.drawSvgToCanvas", 2000);

                runs(function () {
                    expect($(".rasterizeHTML_js_FirefoxWorkaround")).toExist();
                    expect($(".rasterizeHTML_js_FirefoxWorkaround svg")).toExist();
                    expect($(".rasterizeHTML_js_FirefoxWorkaround").css("visibility")).toEqual("hidden");
                    expect($(".rasterizeHTML_js_FirefoxWorkaround").css("position")).toEqual("absolute");
                    expect($(".rasterizeHTML_js_FirefoxWorkaround").css("top")).toEqual("-10000px");
                    expect($(".rasterizeHTML_js_FirefoxWorkaround").css("left")).toEqual("-10000px");
                });
            });

            it("should add the workaround for each canvas", function () {
                var renderFinishedCount = 0,
                    canvas1 = document.createElement("canvas"),
                    canvas2 = document.createElement("canvas"),
                    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"></svg>';

                rasterizeHTML.drawSvgToCanvas(svg, canvas1, function () { renderFinishedCount++; });
                rasterizeHTML.drawSvgToCanvas(svg, canvas2, function () { renderFinishedCount++; });

                waitsFor(function () {
                    return renderFinishedCount >= 2;
                }, "rasterizeHTML.drawSvgToCanvas", 2000);

                runs(function () {
                    expect($(".rasterizeHTML_js_FirefoxWorkaround").length).toEqual(2);
                });
            });

            it("should update the workaround when re-rendering the canvas", function () {
                var renderFinishedCount = 0,
                    canvas = document.createElement("canvas"),
                    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"></svg>';

                rasterizeHTML.drawSvgToCanvas(svg, canvas, function () { renderFinishedCount++; });

                waitsFor(function () {
                    return renderFinishedCount >= 1;
                }, "rasterizeHTML.drawSvgToCanvas", 2000);

                runs(function () {
                    rasterizeHTML.drawSvgToCanvas(svg, canvas, function () { renderFinishedCount++; });
                });

                waitsFor(function () {
                    return renderFinishedCount >= 2;
                }, "rasterizeHTML.drawSvgToCanvas", 2000);

                runs(function () {
                    expect($(".rasterizeHTML_js_FirefoxWorkaround").length).toEqual(1);
                });
            });
        }