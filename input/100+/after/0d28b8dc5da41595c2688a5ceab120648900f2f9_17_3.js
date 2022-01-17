function() {
      var byRemote = {};
      assert.equal(Object.keys(results).length, 2);

      // re-index all records by remote
      Object.keys(results).forEach(function(key) {
        var obj = results[key];
        byRemote[obj.remote.id] = obj;
      });

      // EVENTS
      assert.ok(events.remove[0][0]);

      var updateObj = events.update[0][1].remote;
      assert.equal(updateObj.id, '2');

      var addObj = events.add[0][1].remote;
      assert.equal(addObj.id, '3');

      // update
      assert.instanceOf(byRemote[2], Calendar.Models.Calendar);
      assert.equal(byRemote[2].remote.description, 'new desc');
      assert.equal(byRemote[2].name, 'update!');

      // add
      assert.instanceOf(byRemote[3], Calendar.Models.Calendar);
      assert.equal(byRemote[3].name, 'new item');
    }