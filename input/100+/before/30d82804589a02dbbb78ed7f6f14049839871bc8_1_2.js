function () {
            var finished = false,
                drawHtmlSpy = spyOn(rasterizeHTML, "drawHTML").andCallFake(function (html, canvas, baseUrl, callback) {
                    callback(canvas, []);
                });

            ajaxSpy.andCallFake(function (url, success, error) {
                success("some html");
            });

            rasterizeHTML.drawURL("fixtures/image.html", canvas, callback);

            expect(callback).toHaveBeenCalledWith(canvas, []);
            expect(drawHtmlSpy).toHaveBeenCalledWith("some html", canvas, "fixtures/image.html", callback);
        }