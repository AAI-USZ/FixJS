function(post){
              var mykey = 'stats.a_test_value.count';
              return _.include(_.keys(post),mykey) && (post[mykey] == testvalue);
            }