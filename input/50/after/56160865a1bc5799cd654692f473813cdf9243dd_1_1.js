function(post){
              var mykey = 'stats.a_test_value.mean_90';
              return _.include(_.keys(post),mykey) && (post[mykey] == testvalue);
            }