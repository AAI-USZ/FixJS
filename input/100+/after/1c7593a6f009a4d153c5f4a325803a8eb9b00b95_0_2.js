function () {
      var expectedDimensions = WHITEBOARD.createDimensions(4, 8, 0, 0),
        factory = jasmine.createSpyObj('factory', ['build']),
        plotter = WHITEBOARD.createConstrainedPlotter(factory);

      plotter.beginDrawing(4, 8);
      expect(factory.build).toHaveBeenCalledWith(expectedDimensions);
    }