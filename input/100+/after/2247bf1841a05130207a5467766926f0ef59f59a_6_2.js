function cycle () {
      if (0 === i--) return done();

      var a = new A({
          string: "hello world"
        , number: 444848484
        , date: new Date
        , bool: true
        , buffer: new Buffer(0)
        , objectid: new mongoose.Types.ObjectId()
        , array: [4,{},[],"asdfa"]
        , strings: ["one","two","three","four"]
        , numbers:[72,6493,83984643,348282.55]
        , dates:[new Date, new Date, new Date]
        , bools:[true, false, false, true, true]
        , buffers: [new Buffer([33]), new Buffer([12])]
        , objectids: [new mongoose.Types.ObjectId]
        , docs: [ {title: "yo"}, {title:"nowafasdi0fas asjkdfla fa" }]
      });

      a.save(function (err) {
        methods[Math.random()*methods.length|0](a, function () {
          a= u =null;
          process.nextTick(cycle);
        })
      });

      //if (i%2)
        //a.toObject({ depopulate: true });
      //else
        //a._delta();

      if (!(i%50)) {
        //var u = process.memoryUsage();
        //console.error('rss: %d, vsize: %d, heapTotal: %d, heapUsed: %d',
            //u.rss, u.vsize, u.heapTotal, u.heapUsed);
      }
    }