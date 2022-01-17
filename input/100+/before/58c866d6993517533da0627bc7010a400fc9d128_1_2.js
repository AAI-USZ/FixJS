function(){
          expect( 4 );

          var transform = new Transform();
          transform.rotation = [1, 2, 3];

          ok( transform.rotation instanceof math.Vector3, "rotation is a Vector3" );
          ok( transform.rotation.equal( [1, 2, 3] ), "rotation is correct" );
          var expectedLocalMatrix = expectedWorldMatrix = new math.transform.rotation( [1, 2, 3] );

          ok( math.matrix4.equal( transform.localMatrix(), expectedLocalMatrix ), "local matrix is correct" );
          ok( math.matrix4.equal( transform.worldMatrix(), expectedWorldMatrix ), "world matrix is correct" );
        }