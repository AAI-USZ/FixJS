function() {
          assert.ok(subject.connection);
          assert.equal(subject.connection.name, name);
          finishedOpen = true;
        }