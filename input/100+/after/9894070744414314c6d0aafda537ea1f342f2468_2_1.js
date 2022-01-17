function() {
          expect( 2 );

          var position = [1,2,3];
          var rotation = [4,5,6];
          var scale = [7,8,9];
          var transform = new Transform( position, rotation, scale );

          var expectedMatrix = math.transform.compound(position, rotation, scale);
          ok(math.matrix4.equal( transform.localMatrix().buffer, expectedMatrix), "local matrix is correct");
          ok(math.matrix4.equal( transform.worldMatrix().buffer, expectedMatrix), "world matrix is correct");
        }