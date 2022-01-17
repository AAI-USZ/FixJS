function() {
      it("should callback with FBWorld.friendList", function() {
        FB.api('/me/friends', function (r) {
          expect(r.data).toBeDefined();
          expect(r.data).toEqual(FBWorld.friendList());
        });
      });
    }