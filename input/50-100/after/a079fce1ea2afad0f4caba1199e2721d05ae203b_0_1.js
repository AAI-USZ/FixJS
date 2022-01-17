function wsp_test_func(func, data, expect) {
  let result_str = JSON.stringify(func(data));
  let expect_str = JSON.stringify(expect);
  if (result_str !== expect_str) {
    do_throw("expect value: '" + expect_str + "', got '" + result_str + "'");
  }
}