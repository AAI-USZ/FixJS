function(error) {
  var applied;
  try {
    if (this.args) {
      applied = this.subject.apply(null, this.args);
    } else {
      applied = this.subject();
    }
    return result({
      success: false,
      expected: error,
      actual: applied,
      reason: 'expected throw exception. but nothing thrown.'
    });
  } catch (e) {
    var is_eq = e instanceof error;
    return result({
      success: is_eq,
      expected: error,
      actual: e,
      reason: is_eq ? 'expected error catch' : 'unexpected error',
      exception: e
    });
  }
}