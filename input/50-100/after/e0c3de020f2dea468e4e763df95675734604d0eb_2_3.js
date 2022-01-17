function () {
            var expectedResult = {"author": "Yogi bear"};
            
            spyOn(Whitelist.prototype, "isFeatureAllowed").andReturn(true);
            spyOn(applicationAPIServer, "author").andCallFake(function (success, fail) {
                success(expectedResult);
            });
            
            server.handle(req, res);
            
            expect(res.send).toHaveBeenCalledWith(200, encodeURIComponent(JSON.stringify({
                code: 1,
                data: expectedResult
            })));
        }