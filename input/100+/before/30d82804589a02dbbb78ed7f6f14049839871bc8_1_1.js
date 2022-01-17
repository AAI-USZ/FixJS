function () {
            var html = "<head><title>a title</title></head><body>some html</body>",
                drawDocumentSpy = spyOn(rasterizeHTML, "drawDocument").andCallFake(function (doc, canvas, baseUrl, callback) {
                    callback(canvas, []);
                });

            rasterizeHTML.drawHTML(html, canvas, callback);

            expect(drawDocumentSpy).toHaveBeenCalledWith(jasmine.any(Object), canvas, null, callback);
            expect(drawDocumentSpy.mostRecentCall.args[0].documentElement.innerHTML).toEqual(html);

            expect(callback).toHaveBeenCalledWith(canvas, []);
        }