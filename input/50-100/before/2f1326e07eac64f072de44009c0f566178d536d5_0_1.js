function(err, result) {
                                     do_check_eq(err, null);
                                     do_check_neq(result, null);
                                     
                                     result.verify({
                                                     assertion:saved_state.assertion
                                                   },
                                                   function(err, result) {
                                                     do_check_eq(err, null);
                                                     do_check_neq(result, null);
                                                     do_check_eq(
                                                       result.identity,
                                                       "ben@adida.net");
                                                     do_check_eq(
                                                       result.message,"testmessage");
                                                     run_next_test();
                                                   });
                                   }