function () {
            var expectedResult = "omg";
            
            spyOn(Whitelist.prototype, "isFeatureAllowed").andReturn(true);
            spyOn(applicationAPIServer, "author").andCallFake(function (success, fail) {
                fail(-1, expectedResult);
            });
            
            server.handle(req, res);
            
            expect(res.send).toHaveBeenCalledWith(200, encodeURIComponent(JSON.stringify({
                code: -1,
                data: null,
                msg: expectedResult
            })));
        }