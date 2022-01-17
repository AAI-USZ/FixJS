function() {
          expect( 6 );

          var position1 = [1,2,3];
          var rotation1 = [4,5,6];
          var scale1 = [7,8,9];
          var position2 = [10,11,12];
          var rotation2 = [13,14,15];
          var scale2 = [16,17,18];
          var position3 = [19,20,21];
          var rotation3 = [22,23,24];
          var scale3 = [25,26,27];
          var transform1 = new Transform( position1, rotation1, scale1 );
          var transform2 = new Transform( position2, rotation2, scale2 );
          var transform3 = new Transform( position3, rotation3, scale3 );

          var entity1 = new Entity("entity1", [transform1]);
          var entity2 = new Entity("entity2", [transform2], [], entity1);
          var entity3 = new Entity("entity3", [transform3], [], entity2);

          var expected1 = math.transform.compound( position1, rotation1, scale1 );
          var expected2 = math.transform.compound( position2, rotation2, scale2 );
          var expected3 = math.transform.compound( position3, rotation3, scale3 );

          var worldMatrix2 = math.matrix4.multiply(expected2, transform1.worldMatrix().buffer);
          var worldMatrix3 = math.matrix4.multiply(expected3, transform2.worldMatrix().buffer);

          ok(math.matrix4.equal(transform1.worldMatrix().buffer, expected1),
            "first world matrix is correct");
          ok(math.matrix4.equal(transform2.worldMatrix().buffer, worldMatrix2),
            "second world matrix is correct");
          ok(math.matrix4.equal(transform3.worldMatrix().buffer, worldMatrix3),
            "third world matrix is correct");

          ok(math.matrix4.equal(transform1.localMatrix().buffer, expected1),
            "first local matrix is correct");
          ok(math.matrix4.equal(transform2.localMatrix().buffer, expected2),
            "second local matrix is correct");
          ok(math.matrix4.equal(transform3.localMatrix().buffer, expected3),
            "third local matrix is correct");
        }