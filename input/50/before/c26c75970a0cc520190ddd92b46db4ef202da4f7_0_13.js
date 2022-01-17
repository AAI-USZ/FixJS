function() {
          expect(isReady).toBe(true);
          expect(isErr).toBe(false);

          mongo.close();
        }