function testFile(test) {
  var test = test.replace(".js", "");
  try {
    require(test);
    util.puts("PASS " + path.basename(test));
  }
  catch(e) {
    var msg = "FAIL " + test + ": " +  e;
    if(e.expected != true)
      msg += ", expected: " + JSON.stringify(e.expected)
             + " actual: " + JSON.stringify(e.actual);
    util.puts(msg);
  }
}