function() {
      it("should callback with FBWorld.friendList", function() {
        FB.api('/me/friends', function (r) {
          expect(r.data).toBeDefined();
          expect(r.data).toEqual(FBWorld.friendList());
        });
      });

      describe("when a FBWorld.returnError has been set", function() {
        beforeEach(function() {
          FBWorld.forceReturnError('Facebook Error 1');
        });
        it("should callback with the forced error message", function() {
          FB.api('/me/feed', 'post', {}, function (r) {
            expect(r).toEqual('Facebook Error 1');
          });
        });
      });
    }