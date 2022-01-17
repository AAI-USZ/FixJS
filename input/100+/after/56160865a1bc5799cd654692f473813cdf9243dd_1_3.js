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

            var testavgvalue_test = function(post){
              var mykey = 'stats.a_test_value.rate';
              return _.include(_.keys(post),mykey) && (post[mykey] == (testvalue/(me.myflush / 1000)));
            };
            test.ok(_.any(hashes,testavgvalue_test), 'stats.a_test_value.rate should be ' + (testvalue/(me.myflush / 1000)));

            var testcountvalue_test = function(post){
              var mykey = 'stats.a_test_value.count';
              return _.include(_.keys(post),mykey) && (post[mykey] == testvalue);
            };
            test.ok(_.any(hashes,testcountvalue_test), 'stats.a_test_value.rate should be ' + testvalue);

            test.done();
          }