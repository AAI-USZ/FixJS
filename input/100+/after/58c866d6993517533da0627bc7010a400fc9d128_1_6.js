function() {
          expect( 4 );

          var transform = new Transform();
          transform.scale.x = 1;
          transform.scale.y = 2;
          transform.scale.z = 3;

          ok( transform.scale instanceof math.Vector3, "scale is a Vector3" );
          ok( transform.scale.equal( [1, 2, 3] ), "scale is correct" );
          var expectedLocalMatrix = expectedWorldMatrix = new math.transform.scale( [1, 2, 3] );

          ok( math.matrix4.equal( transform.localMatrix().buffer, expectedLocalMatrix ), "local matrix is correct" );
          ok( math.matrix4.equal( transform.worldMatrix().buffer, expectedWorldMatrix ), "world matrix is correct" );
        }