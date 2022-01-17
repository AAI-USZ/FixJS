function() {
          expect( 4 );

          var transform = new Transform();
          transform.position.x = 1;
          transform.position.y = 2;
          transform.position.z = 3;

          ok( transform.position instanceof math.Vector3, "position is a Vector3" );
          ok( transform.position.equal( [1, 2, 3] ), "position is correct" );
          var expectedLocalMatrix = expectedWorldMatrix = new math.transform.translate( [1, 2, 3] );

          ok( math.matrix4.equal( transform.localMatrix().buffer, expectedLocalMatrix ), "local matrix is correct" );
          ok( math.matrix4.equal( transform.worldMatrix().buffer, expectedWorldMatrix ), "world matrix is correct" );
        }