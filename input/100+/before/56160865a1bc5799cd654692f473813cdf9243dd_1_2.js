function(strings){
            test.ok(strings.length > 0,'should receive some data');
            var hashes = _.map(strings, function(x) {
              var chunks = x.split(' ');
              var data = {};
              data[chunks[0]] = chunks[1];
              return data;
            });
            var numstat_test = function(post){
              var mykey = 'statsd.numStats';
              return _.include(_.keys(post),mykey) && (post[mykey] == 1);
            };
            test.ok(_.any(hashes,numstat_test), 'statsd.numStats should be 1');

            var testtimervalue_test = function(post){
              var mykey = 'stats.timers.a_test_value.mean_90';
              return _.include(_.keys(post),mykey) && (post[mykey] == testvalue);
            };
            test.ok(_.any(hashes,testtimervalue_test), 'stats.timers.a_test_value.mean should be ' + testvalue);

            test.done();
          }