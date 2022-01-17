function(post){
              var mykey = 'stats.a_test_value.rate';
              return _.include(_.keys(post),mykey) && (post[mykey] == (testvalue/(me.myflush / 1000)));
            }