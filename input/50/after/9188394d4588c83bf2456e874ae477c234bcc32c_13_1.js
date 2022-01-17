function() {
          assert.ok(subject.connection);
          assert.ok(subject.isOpen);
          assert.equal(subject.connection.name, name);
          finishedOpen = true;
        }