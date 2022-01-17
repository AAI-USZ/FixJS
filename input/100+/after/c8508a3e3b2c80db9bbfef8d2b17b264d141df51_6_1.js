function(err, res) {
      if(res) {
        for(var ix = 0; ix < res.length; ix++) {
          var entry = JSON.parse(res[ix]);
          list[ix + 1] = {
            vid: next[ix],
            artist: entry[3],
            title: entry[4]
          };
        }
      }
      console.log(list);

      // Our beginning pointer should be shifted 
      // BACKWARD by our request count size.
      var newstart = Math.max(data.begin, 0) - next.length;

      // Similarly, the end pointer should also
      // be shifted back too
      var newend = data.end - next.length;

      // If the newend is negative, that is to say,
      // there is nothing more to get, then we
      // can stop here.
      if(newend <= 0) {
        if(--runs == 0) {
          cb(list);
        }
        return;
      }

      // Otherwise, we find the index that we are currently at
      _db.hget("play", data.channel, function(err, last) {
        var currentState = JSON.parse(last);

        // Get the last synchronized playlist
        _db.get("p:" + data.channel, function(err, last) {

          // And form an ROI, which is offset from
          // our newstart to our newend
          var entryList = JSON.parse(last).slice(
            currentState.index + newstart,
            currentState.index + newend
          );
          console.log(
            currentState.index + newstart,
            currentState.index + newend
          );

          // Since the playlist is strictly id based, we
          // need to go off and get the entries in the DB.
          _db.hmget("vid", entryList, function(err, res) {

            for( 
              var ix = 0, index = Math.max(next.length, data.begin);
              ix < res.length; 
              index++, ix++) {
                console.log(index);
                var entry = JSON.parse(res[ix]);
                list[index] = {
                  vid: entryList[ix],
                  artist: entry[3],
                  title: entry[4]
                };
              }

            if(--runs == 0) {
              cb(list);
            }
          });
        });
      });
    }