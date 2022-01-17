function (_, data) {
          assert.isString(data);
          assert.isArray(this.event);
          assert.lengthOf(this.event, 3);
          assert.equal(this.event[0], 'data');
          assert.equal(this.event[1], 'here');
          assert.equal(this.event[2], 'is');
          assert.equal(data, 'something.');
        }