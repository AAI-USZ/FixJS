function test_overall() {
  do_check_neq(webrtc.createAuthModule, null);
  run_next_test();
}