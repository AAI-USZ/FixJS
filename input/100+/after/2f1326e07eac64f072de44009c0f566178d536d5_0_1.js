function test_get_assertion() {
  webrtc.createAuthModule({
    idp:"browserid.org",
    protocol:"persona"
  }, function(err, result) {
    do_check_eq(err, null);
    do_check_neq(result, null);

    result.sign({
      identity:"ben@adida.net",
      origin:"https://example.com",
      message:"testmessage"
    }, function(err, result) {
      do_check_eq(err, null);
      do_check_neq(result, null);
      do_check_neq(result.assertion,null);

      saved_state.assertion = result.assertion;

      run_next_test();
    });
  });
}