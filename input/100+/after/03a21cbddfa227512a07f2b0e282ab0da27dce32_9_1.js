function() {
      it('Calls loader.request()', function() {
        var loader = { request: jasmine.createSpy('request') };
        new Bitmap(loader, 'img.png');
        expect(loader.request).toHaveBeenCalled();
      });
      it('Calls load event [and callback] upon load success', function() {
        var loader = {
          request: function(bitmapInstance, request, type) {
            bitmapInstance.notify('load', { width: 0, height: 0 });
          }
        };
        var eventHandler = jasmine.createSpy('eventHandler');
        var callbackCalled = false;
        var callback = function(err) {
          expect(err).toBe(null);
          expect(this).toBe(bitmap);
          callbackCalled = true;
        };
        var bitmap = new Bitmap(loader, 'img.jpg', callback).on('load', eventHandler);
        // Events will be triggered async, even with a mock loader,
        // This is forced by Bitmap, so as to make sure that post-instantiation events
        // still get fired.
        async(function(next) {
          setTimeout(function() {
            expect(eventHandler).toHaveBeenCalled();
            expect(callbackCalled).toBe(true);
            next();
          }, 10);
        });
      });
      it('Calls error event [and callback] upon load error', function() {
        var loader = {
          request: function(bitmapInstance, request, type) {
            bitmapInstance.notify('error', { error: 'errorMessage123' });
          }
        };
        var eventHandler = jasmine.createSpy('eventHandler');
        var callbackCalled = false;
        var callback = function(err) {
          expect(err instanceof Error).toBe(true);
          expect(err.message).toBe('errorMessage123');
          expect(this).toBe(bitmap);
          callbackCalled = true;
        };
        var bitmap = new Bitmap(loader, 'img.jpg', callback).on('error', eventHandler);
        // Events will be triggered async, even with a mock loader,
        // This is forced by Bitmap, so as to make sure that post-instantiation events
        // still get fired.
        async(function(next) {
          setTimeout(function() {
            expect(eventHandler).toHaveBeenCalled();
            expect(callbackCalled).toBe(true);
            next();
          }, 10);
        });
      });
    }