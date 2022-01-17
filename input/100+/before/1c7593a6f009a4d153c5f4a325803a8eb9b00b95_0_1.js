function () {
        var expectedDimensions = WHITEBOARD.createDimensions(2, 6, 14, 14),
          factory = jasmine.createSpyObj('factory', ['build']),
          shape = jasmine.createSpyObj('shape', ['destroy']),
          plotter = WHITEBOARD.createConstrainedPlotter(factory);

        factory.build.andReturn(shape);
        plotter.beginDrawing(2, 6);

        plotter.resize(10, 20);
        factory.build.andCallFake(function () {
          expect(shape.destroy).toHaveBeenCalled();
        });
        expect(factory.build).toHaveBeenCalledWith(expectedDimensions);

        factory.build.reset();
        factory.build.andReturn(shape);
        shape.destroy.reset();

        plotter.resize(10, 20);
        factory.build.andCallFake(function () {
          expect(shape.destroy).toHaveBeenCalled();
        });
        expect(factory.build).toHaveBeenCalledWith(expectedDimensions);
      }