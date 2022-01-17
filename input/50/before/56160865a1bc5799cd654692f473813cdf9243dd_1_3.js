function(post){
              var mykey = 'stats_counts.a_test_value';
              return _.include(_.keys(post),mykey) && (post[mykey] == testvalue);
            }