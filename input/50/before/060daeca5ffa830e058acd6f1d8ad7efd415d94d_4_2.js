function() {
            var course = grid.plotCourse({ x: 2, y: 2 }, { x: 1, y: 1 });
            course.should.deep.equal([90, 180]);
        }