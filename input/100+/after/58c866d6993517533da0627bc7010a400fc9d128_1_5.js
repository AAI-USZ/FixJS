function() {
          expect( 4 );

          var transform = new Transform();
          transform.rotation.x = 1;
          transform.rotation.y = 2;
          transform.rotation.z = 3;

          ok( transform.rotation instanceof math.Vector3, "rotation is a Vector3" );
          ok( transform.rotation.equal( [1, 2, 3] ), "rotation is correct" );
          var expectedLocalMatrix = expectedWorldMatrix = new math.transform.rotate( [1, 2, 3] );

          ok( math.matrix4.equal( transform.localMatrix().buffer, expectedLocalMatrix ), "local matrix is correct" );
          ok( math.matrix4.equal( transform.worldMatrix().buffer, expectedWorldMatrix ), "world matrix is correct" );
        }