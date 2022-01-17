function() {
      expect(dispatcher.on('bunnies', view.buttonClick, view)).toEqual(dispatcher);
    }