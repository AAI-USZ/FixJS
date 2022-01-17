function (err, res) {
        db.close();
        assert.ifError(err);

        if (!(res && res.documents && res.documents[0] && res.documents[0].ok)) {
          throw new Error('could not shard test collection ' + collection);
        }

        done();
      }