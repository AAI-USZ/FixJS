function() {
      it("should callback with a fail message", function() {
        FB.api(null, 'post', {}, function (r) {
          expect(r.error).toBeDefined();
          expect(r.error.code).toBeDefined();
          expect(r.error.message).toBeDefined();
          expect(r.error.type).toBeDefined();
        });
      });

      describe("when a FBWorld.returnError has been set", function() {
        beforeEach(function() {
          FBWorld.forceReturnError('Facebook Error 1');
        });

        it("should callback with the forced error message", function() {
          FB.api(null, 'post', {}, function (r) {
            expect(r).toEqual('Facebook Error 1');
          });
        });
      });
    }