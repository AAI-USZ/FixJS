function() {
        beforeEach(function() {
          FBWorld.forceReturnError('Facebook Error 1');
        });

        it("should callback with the forced error message", function() {
          FB.api(null, 'post', {}, function (r) {
            expect(r).toEqual('Facebook Error 1');
          });
        });
      }