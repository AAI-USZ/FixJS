function test()
{
  enterFunc ('test');
  printBugNumber(BUGNUMBER);
  printStatus (summary);

  if (typeof clone == 'undefined') {
    expect = 'SKIPPED';
    actual = 'SKIPPED';
  }
  else {
    expect = 'PASSED';

    f = Function("return a * a;");
    g = clone(f, {a: 3});
    f = null;
    gc();
    try {
      a_squared = g(2);
      if (a_squared != 9)
        throw "Unexpected return from g: a_squared == " + a_squared;
      actual = "PASSED";
    } catch (e) {
      actual = "FAILED: " + e;
    }
  }
 
  reportCompare(expect, actual, summary);

  exitFunc ('test');
}