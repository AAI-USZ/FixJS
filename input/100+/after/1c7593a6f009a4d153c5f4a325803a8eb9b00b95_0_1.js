function () {
        var shape = jasmine.createSpyObj('shape', ['destroy']);

        factory = jasmine.createSpyObj('factory', ['build']);
        plotter = WHITEBOARD.createConstrainedPlotter(factory);

        factory.build.andReturn(shape);
        plotter.beginDrawing(20, 20);
        factory.build.reset();
      }