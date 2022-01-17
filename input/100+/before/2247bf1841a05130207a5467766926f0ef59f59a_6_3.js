function done () {
      var time= (new Date - start)/1000;
      console.error('took %d seconds for %d docs (%d dps)', time, total, total/time);
      var used = process.memoryUsage();
      console.error(((used.vsize - started.vsize) / 1048576)+' MB');

      //console.error(a.toObject({depopulate:true}));

      mongoose.connection.db.dropDatabase(function () {
        mongoose.connection.close();
      });
    }