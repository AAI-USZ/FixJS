function() {
      it("should callback with a fail message", function() {
        FB.api(null, 'post', {}, function (r) {
          expect(r.error).toBeDefined();
          expect(r.error.code).toBeDefined();
          expect(r.error.message).toBeDefined();
          expect(r.error.type).toBeDefined();
        });
      });
    }