function (err) {
    if (err) throw new Error(err);

    --pending;
    process.stderr.write(
        '\u001B[30m'
      + (new Array(total - pending)).join('√')
      + '\u001B[0m'
      + '\u001B[30m'
      + (new Array(pending)).join('░')
      + '\u001B[0m'
      + '\r'
    );

    if (pending) return;

    var leaks = gleak.detect();
    assert.equal(0, leaks.length, "global leaks detected: " + leaks);
    console.error("\n\u001B[32mAll tests passed\u001B[0m")
  }