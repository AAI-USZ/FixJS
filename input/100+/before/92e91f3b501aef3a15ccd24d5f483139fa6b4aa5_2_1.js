function() {
        expect( 1 );

        var rotation = [this.math.TAU/2, this.math.TAU/3, this.math.TAU/4];
        var transform = this.math.transform.rotate( rotation );
        var expected = [0, -1/2, -Math.sqrt(3)/2, 0,
                        1, 0, 0, 0,
                        0, -Math.sqrt(3)/2, 1/2, 0,
                        0, 0, 0, 1];
        ok( this.math.matrix4.equal( transform, expected ), "transform is correct" );
      }