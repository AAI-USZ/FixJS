function() {
          expect( 4 );

          var transform = new Transform();
          transform.position = [1, 2, 3];

          ok( transform.position instanceof math.Vector3, "position is a Vector3" );
          ok( transform.position.equal( [1, 2, 3] ), "position is correct" );
          var expectedLocalMatrix = expectedWorldMatrix = new math.transform.position( [1, 2, 3] );

          ok( math.matrix4.equal( transform.localMatrix(), expectedLocalMatrix ), "local matrix is correct" );
          ok( math.matrix4.equal( transform.worldMatrix(), expectedWorldMatrix ), "world matrix is correct" );
        }