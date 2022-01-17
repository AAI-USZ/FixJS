function() {
  function run(args) {
    var formula = args[0];
    var expected = args[1];
    var postfix = Calculator.infix2postfix(formula);
    var result = Calculator.evaluatePostfix(postfix);
    return expected === result;
  };

  var formulas = [
    ['1+1', 2],
    ['3+4*2/(1-5)', 1],
    ['39+4*2/(1-5)', 37],
    ['(39+4)*2/(1-5)', -21.5],
    ['4+-5', -1],
    ['-5*6', -30],
    ['-5.5*6', -33],
    ['-5.5*-6.4', 35.2]
  ];

  var passed = formulas.every(run);

  if (passed) {
    console.log('Tests Passed!');
  }
  return passed;
}