function() {
      view.tearDown();
      dispatcher.trigger('custom');
      expect(view.buttonClicks).toEqual(0);
      expect(view.eventDispatchers[dispatcher._coccyxId]).toBeFalsy();
    }